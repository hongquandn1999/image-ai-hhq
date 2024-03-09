import { eventTypes } from '@/app/constants';
import {
  createUser,
  deleteUser,
  updateUser,
} from '@/lib/database/actions/user.actions';
import { clerkClient } from '@clerk/nextjs';
import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return new Response('Webhook secret not set', { status: 500 });
  }

  // get the header

  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, return a 400
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', { status: 400 });
  }

  // Get the raw body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new svix instance from the secret key
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify payload with the header
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    return new Response('Error occurred -- could not verify', { status: 400 });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  // Create

  if (eventType === eventTypes.created) {
    const { id, email_addresses, image_url, first_name, last_name, username } =
      evt.data as any;

    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      username: username!,
      firstName: first_name,
      lastName: last_name,
      photo: image_url,
    };

    const newUser = await createUser(user);

    // Set public metadata
    if (newUser) {
      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: newUser._id,
        },
      });
    }

    return NextResponse.json({ message: 'User created', user: newUser });
  }

  // Update

  if (eventType === eventTypes.updated) {
    const { id, image_url, first_name, last_name, username } = evt.data as any;

    const user = {
      firstName: first_name,
      lastName: last_name,
      username: username!,
      photo: image_url,
    };

    const updatedUser = await updateUser(id, user);

    return NextResponse.json({ message: 'User updated', user: updatedUser });
  }

  // Delete

  if (eventType === eventTypes.deleted) {
    const { id } = evt.data as any;

    await deleteUser(id);

    return NextResponse.json({ message: 'User deleted', userId: id });
  }

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log('Webhook body:', body);

  return new Response('', { status: 200 });
}
