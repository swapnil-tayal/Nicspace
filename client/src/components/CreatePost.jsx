import React from "react";
import { useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { useState } from "react";

const CreatePost = () => {

  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const user = useSelector((state) => state.user);

  const handlePostPic = async (e) => {
    
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("description", "random")
    formData.append("picturePath", image.name)
    formData.append("picture", image);

    const response = await fetch(`http://localhost:3001/posts/picture`, {
      method: "POST",
      // headers: { "Content-Type": "application/json" },
      body: formData,
    })
    const post = await response.json();
    console.log('success')
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
      <form onSubmit={handlePostPic}>
        <label>Upload profile picture</label>
        <br />
        <Dropzone className="h-10 w-10 bg-black" onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
        <button onClick={handlePostPic}> Sumbit</button>
      </form>

      <hr />
      
      <form onSubmit={handlePostVid}>
        <label>Upload profile video</label>
        <br />
        <Dropzone className="h-10 w-10 bg-black" onDrop={(acceptedFiles) => setVideo(acceptedFiles[0])}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
        <button onClick={handlePostVid}> Sumbit</button>
      </form>

    </div>
  );
};

export default CreatePost;
