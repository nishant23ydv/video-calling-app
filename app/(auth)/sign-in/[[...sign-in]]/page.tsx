import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <SignIn
        appearance={{
          elements: {
            // Google - full width block button
            socialButtonsBlockButton__google: {
              backgroundColor: "#ffffff",
              color: "#000000",
              border: "1px solid #d1d5db",
              "&:hover": {
                backgroundColor: "#f3f4f6",
              },
            },
            // Facebook - icon button
            socialButtonsIconButton__facebook: {
              backgroundColor: "#1877F2",
              border: "none",
              "&:hover": {
                backgroundColor: "#166FE5",
              },
            },
            // GitHub - icon button
            socialButtonsIconButton__github: {
              backgroundColor: "#ffffff",
              border: "1px solid #333333",
              "&:hover": {
                backgroundColor: "#f8f2f2",
              },
            },
            socialButtonsBlockButtonText: {
              fontWeight: 500,
            },
          },
        }}
      />
    </main>
  );
};

export default SignInPage;