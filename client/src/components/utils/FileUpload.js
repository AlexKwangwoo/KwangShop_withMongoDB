import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Icon } from "antd";
import axios from "axios";

function FileUpload(props) {
  const [Images, setImages] = useState([]);
  //우리가 drop한 이미지를 확인누르기전까지 파일을 저장해야한다

  const dropHandler = (files) => {
    let formData = new FormData(); //파일전송시 같이 해줘야한다!!
    const config = {
      header: { "content-type": "multipart/form-data" },
    }; //백엔드 에서 받을 때 form데이터에 설명을 붙여서 백엔드에 보낸다..map쓸때 key값이라고 보면된다!
    formData.append("file", files[0]);

    axios.post("/api/product/image", formData, config).then((response) => {
      if (response.data.success) {
        setImages([...Images, response.data.filePath]);
        props.refreshFunction([...Images, response.data.filePath]);
        console.log(response.data);
      } else {
        alert("파일을 저장하는데 실패했습니다.");
      }
    });
  };

  const deleteHandler = (image) => {
    const currentIndex = Images.indexOf(image);
    let newImages = [...Images];
    newImages.splice(currentIndex, 1);
    //splice의 기능은.. 커런트 인뎃스부터 몇개 지울지 정하면 그거만 리턴값을주고!
    // newImages자체는 그값을 빼고 나온다!
    setImages(newImages);
    props.refreshFunction(newImages);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={dropHandler}>
        {/* onDrop은 아이탬을 업로드시 일어날일을 설명해주면된다! */}
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: 300,
              height: 500,
              border: "1px solid lightgray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Icon type="plus" style={{ fontSize: "3rem" }} />
          </div>
        )}
      </Dropzone>
      {/* 드랍존은 react드랍존의 문서에서 받아온것이다! */}
      <div
        style={{
          display: "flex",
          width: "350px",
          height: "500px",
          overflowX: "scroll",
        }}
      >
        {Images.map((image, index) => (
          <div onClick={() => deleteHandler(image)} key={index}>
            <img
              style={{ minWidth: "350px", width: "350px", height: "500px" }}
              src={`http://localhost:5000/${image}`}
              // 이경로는 uploads루트쪽 파일에 저장을해서 path를 받아옴..아직 db저장안했음
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
