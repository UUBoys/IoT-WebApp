import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AcceptInvitePage: React.FunctionComponent = () => {
  const { query } = useRouter();
  const { data: session, status } = useSession();
  const inviteToken = (query?.inviteCode as string) || "";

  const roomId = (query?.roomId as string) || "";
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (status === "loading") return; // Wait until session is fully loaded
    if (!session?.user) {
      setIsRedirecting(true);
      router.push(`/auth/signin?inviteToken=${inviteToken}&roomId=${roomId}`);
    } else {
      router.push(`/joinRoom/acceptInvite/${inviteToken}?roomId=${roomId}`);
    }
  }, [inviteToken, router, session?.user, status]);

  if (isRedirecting || status === "loading") {
    return <>...Redirecting</>;
  }

  return <>You are invited to the room: {inviteToken}</>;
};

export default AcceptInvitePage;
