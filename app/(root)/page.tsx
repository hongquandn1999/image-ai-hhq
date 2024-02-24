import { UserButton } from '@clerk/nextjs';

const HomePage = () => {
  return (
    <div>
      <p>Home</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default HomePage;
