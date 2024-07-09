import { Button, LabelledInput } from "../components/Auth";
import { FilePond } from "../components/Filepond";
import { v4 as uuidv4 } from "uuid";
import { TextArea } from "../components/NewEditor";
import { useParams } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loggedUser, modal, toast } from "../recoil/atom/atom";
import { Skeletons } from "../components/Skeletons";
import Spinner from "../components/Spinner";
import { MESSAGES } from "../data/data";

export const Profile = () => {
  const { id } = useParams();
  const [loggedInUser, setLoggedUser] = useRecoilState(loggedUser);

  if (!id) {
    return <div>Log in to look at profile details</div>;
  }

  console.log(id);
  const setToast = useSetRecoilState(toast);
  const setModalState = useSetRecoilState(modal);
  const { user, setUser, updateUser, loading, submitting, error } = useUser(id);

  const setDescription = (desc: string) => {
    console.log("set desc", user);
    setUser({ ...user, description: desc });
  };

  const handleImageChange = (src: string) => {
    setUser({ ...user, profileImage: src });
  };

  if (error) {
    setModalState({ visible: true, message: error, href: "/" });
  }

  if (loading) {
    return <Skeletons type="profile" />;
  }

  return (
    <div className="flex flex-col container max-w-[1280px] bg-slate-200 rounded-md pb-16 mt-6 m-auto">
      <div className="text-2xl font-semibold text-center m-3">Your Details</div>
      <div className="w-11/12 m-auto flex flex-col-reverse md:flex-row bg-white lg:p-4 md:p-2">
        <div className="flex flex-col lg:w-4/6 md:w-7/12">
          <form>
            <LabelledInput
              label="Name"
              placeholder="Enter name"
              onChange={() => {}}
              value={user.name}
              type="text"
              style="lg:w-4/5 md:w-11/12 w-4/5 m-auto"
              disabled
              key={uuidv4()}
            />
            <LabelledInput
              label="Email"
              onChange={() => {}}
              value={user.email}
              type="email"
              style="lg:w-4/5 md:w-11/12 w-4/5 m-auto"
              disabled
              key={uuidv4()}
            />
            <div className="lg:w-4/5 md:w-11/12 w-4/5 m-auto">
              <TextArea
                id="title"
                setValue={setDescription}
                value={user.description || ""}
                rows={5}
                placeholder="Description"
                label="Description"
                style="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full"
              />
            </div>
            <div className="lg:w-4/5 md:w-11/12 w-4/5 m-auto">
              <Button
                name="Submit"
                onClick={async () => {
                  const data = await updateUser(
                    id,
                    user.name,
                    user.email,
                    user.description || "",
                    user.profileImage || ""
                  );
                  console.log(data);
                  localStorage.setItem("token", data.token);
                  setLoggedUser({
                    ...loggedInUser,
                    profileImage: user.profileImage || "",
                  });
                  // navigate("/");
                  setToast({
                    toastVisible: true,
                    toastMessage: MESSAGES.profileUpdated,
                    toastType: "success",
                    isToastCloseRequired: true,
                  });
                }}
                style="w-full mb-3"
              />
            </div>
          </form>
        </div>
        <div className="lg:w-2/6 md:w-5/12 lg:h-96 md:h-64 md:pl-2.5 flex flex-col align-middle m-auto md:m-0">
          <FilePond src={user.profileImage || ""} setSrc={handleImageChange} />
        </div>
      </div>
      <Spinner loading={submitting} type="Editor" />
    </div>
  );
};
