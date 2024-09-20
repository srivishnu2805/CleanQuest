import Image from "next/image";
import firebase from "firebase/compat/app";
import { addDoc, collection } from "@firebase/firestore";

const AddPost = (formData: FormData, p0: any) => {
  function setDesc(value: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
      {/*AVATAR*/}
      <Image
        src="https://images.pexels.com/photos/27745133/pexels-photo-27745133/free-photo-of-green-big-leaves-of-plant.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        alt=""
        width={48}
        height={48}
        className="w-12 h-12 object-cover rounded-full"
      />
      {/*POST*/}
      <div className="flex-1">
        {/*TEXT INPUT*/}
        <div className="flex gap-4">
          <textarea
            placeholder="Post the image that are polluted and not Maintained?"
            className="flex-1 bg-slate-100 rounded-lg p-2"
            name="desc"
          ></textarea>
          <Image
            src="/emoji.png"
            alt=""
            width={20}
            height={20}
            className="w-5 h-5 cursor-pointer self-end"
          />
        </div>
        {/*POST OPTION*/}
        <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/addimage.png"
              alt=""
              width={20}
              height={20}
              className="w-5 h-5 cursor-pointer self-end"
            />
            Photo
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/addVideo.png"
              alt=""
              width={20}
              height={20}
              className="w-5 h-5 cursor-pointer self-end"
            />
            Viedo
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/addevent.png"
              alt=""
              width={20}
              height={20}
              className="w-5 h-5 cursor-pointer self-end"
            />
            Event
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/poll.png"
              alt=""
              width={20}
              height={20}
              className="w-5 h-5 cursor-pointer self-end"
            />
            Poll
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default AddPost;
