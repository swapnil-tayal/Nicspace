import React from "react";
import { useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { useState } from "react";

const CreatePost = () => {

  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [showPublishButton, setShowPublishButton] = useState(false);

  const user = useSelector((state) => state.user);

  const handlePostPic = async (e) => {

    e.preventDefault();
    console.log(image, title, link, description, tag);
    
    const formData = new FormData();  
    formData.append("userId", user._id);
    formData.append("description", description)
    formData.append("picturePath", image.name)
    formData.append("picture", image);
    formData.append("title", title);
    formData.append("link", link);
    formData.append("tag", tag);

    const response = await fetch(`http://localhost:3001/posts/picture`, {
      method: "POST",
      // headers: { "Content-Type": "application/json" },
      body: formData,
    })
    
    const post = await response.json();
    console.log('success')

    setImage(null);
    setVideo(null);
    setTitle("");
    setLink("");
    setDescription("");
    setTag("");
    setShowPublishButton(true);
  };

  const handlePostVid = async (e) => {
    
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("description", "random");
    formData.append("picturePath", video.name);
    formData.append("video", video);
    console.log(video);

    const response = await fetch(`http://localhost:3001/posts/video`, {
      method: "POST",
      // headers: { "Content-Type": "application/json" },
      body: formData,
    })
    const post = await response.json();
    console.log('success')
  };

  return (

    <div>

      <div className="flex flex-row p-2 sm:px-16 sm:py-6 justify-between border-y-8" >
        <div className="text-2xl"> Create Nic </div>
        { image &&
        <button 
                onClick={handlePostPic}
                className="bg-red-600 hover:bg-red-700 text-gray-50 rounded-3xl px-4 py-2"
                > Publish
        </button>
        }
        { showPublishButton &&
        <div 
          className="bg-black text-white rounded-3xl px-4 py-2"> 
          Your Content is Published 
        </div>
        }
      </div>
      <div className="flex flex-col sm:flex-row justify-center mt-8 gap-16">

        <div className="p-2">
          <Dropzone acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false} 
                    onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}>
            {({ getRootProps, getInputProps }) => (
            <div>
              <div className="h-[20rem] sm:h-[26rem] w-[90vw] sm:w-[24rem] bg-[#e9e9e9] flex flex-col justify-center rounded-3xl" {...getRootProps()}>
                <div className="px-[10rem] flex flex-row">
                  <img className="w-[50px]" src="../images/upload.png" alt="" /> 
                </div>
                <input  {...getInputProps()} />
                <p className="px-[3.5rem]">Choose a file or drag and drop it here</p>
                {image && (
                  <div>
                    <div className="py-4 px-[4rem]"> {image.name} </div>
                  </div>
                )}
              </div>
            </div>
            )}
          </Dropzone>
          {/* <button > Sumbit</button> */}
        </div>

        <form className="p-2">
          <div className="items-start text-sm ml-[7px] mb-[5px]">Title</div>
          { image ?
            <input  className="border-solid border-2 p-[12px] w-[90vw] sm:w-[30rem] focus:border-cyan-500 
                              focus:outline-none rounded-xl" 
                    value={title} 
                    required      
                    onChange={(e) => setTitle(e.target.value)}        
                    placeholder="Add a title" 
            />
          : 
          <input  className="border-solid border-2 p-[12px] w-[90vw] sm:w-[30rem] focus:border-cyan-500 
                            focus:outline-none rounded-xl" 
                  value={title} 
                  required     
                  disabled     
                  onChange={(e) => setTitle(e.target.value)}      
                  placeholder="Add a title" 
          />
          } 
          <div className="items-start text-sm ml-[7px] mb-[5px] mt-[20px]">Description</div>
          { image ?  
            <input  className="border-solid border-2 p-[12px] w-[90vw] sm:w-[30rem] focus:border-cyan-500 
                              focus:outline-none rounded-xl" 
                    value={description} 
                    required
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add a detailed Description" 
            /> 
            :
            <input  className="border-solid border-2 p-[12px] w-[90vw] sm:w-[30rem] focus:border-cyan-500 
                              focus:outline-none rounded-xl" 
                    value={description} 
                    required
                    onChange={(e) => setDescription(e.target.value)}
                    disabled
                    placeholder="Add a detailed Description" 
            /> 
          }
          <div className="items-start text-sm ml-[7px] mb-[5px] mt-[20px]">Link</div>
          { image ?  
            <input  className="border-solid border-2 p-[12px] w-[90vw] sm:w-[30rem] focus:border-cyan-500 
                              focus:outline-none rounded-xl" 
                    text="link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)} 
                    required
                    placeholder="Add a Link" 
            /> 
            :
            <input  className="border-solid border-2 p-[12px] w-[90vw] sm:w-[30rem] focus:border-cyan-500 
                              focus:outline-none rounded-xl" 
                    text="link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)} 
                    required
                    disabled
                    placeholder="Add a Link" 
            /> 
          }
          <div className="items-start text-sm ml-[7px] mb-[5px] mt-[20px]">Tagged Topics</div>
          { image ?  
            <input  className="border-solid border-2 p-[12px] w-[90vw] sm:w-[30rem] focus:border-cyan-500 
                              focus:outline-none rounded-xl" 
                    value={tag}
                    onChange={(e) => setTag(e.target.value)} 
                    required
                    placeholder="Search for a tag" 
            /> 
            :
            <input  className="border-solid border-2 p-[12px] w-[90vw] sm:w-[30rem] focus:border-cyan-500 
                              focus:outline-none rounded-xl" 
                    value={tag}
                    onChange={(e) => setTag(e.target.value)} 
                    required
                    disabled
                    placeholder="Search for a tag" 
            /> 
          }
        </form>

      </div>
    </div>

  );
};

export default CreatePost;
