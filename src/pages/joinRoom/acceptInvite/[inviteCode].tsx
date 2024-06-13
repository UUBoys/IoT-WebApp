import { useJoinRoom } from "@/modules/common/hooks/MutationHooks/useJoinRoom";
import { useRoom } from "@/modules/common/hooks/QueryHooks/useRoom";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AcceptInvitePage: React.FunctionComponent = () => {
  const { query, push } = useRouter();
  const inviteToken = (query?.inviteCode as string) || "";
  const { room } = useRoom(query?.roomId as string);
  const { joinRoomAsync } = useJoinRoom();
  const { data: session, status } = useSession();
  const [isRedirecting, setIsRedirecting] = useState(true);

  useEffect(() => {
    if (status === "loading") return; // Wait until session is fully loaded
    if (!session?.user) {
      push(`/auth/signin?inviteToken=${inviteToken}&roomId=${query?.roomId}`);
    } else {
      setIsRedirecting(false);
    }
  }, [inviteToken, push, session?.user, status]);

  const handleInviteAccept = async () => {
    try {
      await joinRoomAsync(inviteToken);
      toast.success("Připojení do místnosti bylo úspěšné!");
      push(`/room/${query?.roomId}`);
    } catch (error) {
      toast.error("Něco se pokazilo! " + error);
      push("/");
    }
  };

  return (
    <section className="h-screen w-full bg-white">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="rounded-lg border border-gray-300 bg-gray-200 p-16 shadow-xl sm:w-[500px] 2xl:w-1/2">
          <div className="w-full text-center text-2xl text-[#111928]">
            Byl jste pozván do této místnosti
            <p className="font-bold">{room?.name}</p>
          </div>
          <div className="mt-4 flex items-center justify-center">
            <div>
              <button
                className="mt-4 w-full rounded-lg bg-primary-600 px-6 py-3 text-sm font-bold text-white shadow outline-none transition-all hover:text-gray-700 hover:bg-primary-400/75"
                onClick={handleInviteAccept}
              >
                Přidat se do této místnosti
              </button>
              <button
                className="mt-4 w-full border-none bg-inherit px-6 py-3 text-sm font-bold text-secondary-500 outline-none transition-all hover:text-secondary-700"
                onClick={() => push("/")}
              >
                Odmítnout pozvánku
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcceptInvitePage;
