'use server';

import { handleError } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import User from '../models/user.model';
import { connectToDatabase } from '../mongoose';

// Create a new user
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

// READ

export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId });

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

// DELETE

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId });

    if (!user) {
      throw new Error('User not found');
    }

    const deletedUser = await User.findOneAndDelete({ clerkId });
    revalidatePath('/');

    return JSON.parse(JSON.stringify(deletedUser));
  } catch (error) {
    handleError(error);
  }
}

// USE CREDIT
export async function updatedCredits(userId: string, creditFee: number) {
  try {
    await connectToDatabase();

    const updatedUserCredit = User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $inc: { creditBalance: creditFee },
      },
      {
        new: true,
      }
    );

    if (!updatedUserCredit) {
      throw new Error('User credit update failed');
    }

    return JSON.parse(JSON.stringify(updatedUserCredit));
  } catch (error) {
    handleError(error);
  }
}
