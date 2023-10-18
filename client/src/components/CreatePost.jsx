import React from "react";
import { useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { useState } from "react";

const CreatePost = () => {

  const [image, setImage] = useState(null);
  const user = useSelector((state) => state.user);

  const handlePost = async (e) => {
    
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("description", "random")
    formData.append("picturePath", image.name)
    formData.append("picture", image);

    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      // headers: { "Content-Type": "application/json" },
      body: formData,
    })
    const post = await response.json();
    console.log('success')
  };

  return (
    <div>
      <form onSubmit={handlePost}>
        <label>Upload profile picture</label>
        <br />
        <Dropzone onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
        <button onClick={handlePost}> Sumbit</button>
      </form>

      <hr />
    </div>
  );
};

export default CreatePost;
