import { Button, LabelledInput } from "../components/Auth";
import { FilePond } from "../components/Filepond";
import { v4 as uuidv4 } from "uuid";
import { TextArea } from "../components/NewEditor";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useSetRecoilState } from "recoil";
import { modal } from "../recoil/atom/atom";
import { Skeletons } from "../components/Skeletons";
import Spinner from "../components/Spinner";

export const Profile = () => {
  const { id } = useParams();

  if (!id) {
    return <div>Log in to look at profile details</div>;
  }

  console.log(id);
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
    return <Skeletons type="" />;
  }

  return (
    <div className="flex flex-col container bg-slate-200 rounded-md pb-16">
      <div className="text-2xl font-semibold text-center m-3">Your Details</div>
      <div className="w-11/12 m-auto flex bg-white p-4">
        <div className="flex flex-col w-4/6 ">
          <form>
            <LabelledInput
              label="Name"
              placeholder="Enter name"
              onChange={() => {}}
              value={user.name}
              type="text"
              style="w-4/5 m-auto"
              disabled
              key={uuidv4()}
            />
            <LabelledInput
              label="Email"
              onChange={() => {}}
              value={user.email}
              type="email"
              style="w-4/5 m-auto"
              disabled
              key={uuidv4()}
            />
            <div className="w-4/5 m-auto">
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
            <div className="w-4/5 m-auto">
              <Button
                name="Submit"
                onClick={() =>
                  updateUser(
                    id,
                    user.description || "",
                    user.profileImage || ""
                  )
                }
                style="w-full mb-3"
              />
            </div>
          </form>
        </div>
        <div className="w-2/6 h-full md:h-96 flex flex-col align-middle">
          <FilePond src={user.profileImage || ""} setSrc={handleImageChange} />
        </div>
      </div>
      <Spinner loading={submitting} type="Editor" />
    </div>
  );
};
