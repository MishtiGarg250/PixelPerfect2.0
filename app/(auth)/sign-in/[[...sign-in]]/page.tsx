import { SignIn } from "@clerk/nextjs";

function Page() {
  return (
    <section className="pb-24 pt-32 sm:pt-40">
      <div className="container mx-auto flex max-w-5xl items-center justify-center">
        <SignIn />
      </div>
    </section>
  );
}

export default Page;
