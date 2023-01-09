import "./edit.scss";
import { apiUrl } from "../../../../contexts/constan";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const Edit = (props) => {
  const schema = yup.object().shape({
    _id: yup.string().required(),
    name: yup.string().required("username is require"),
    description: yup.string().required("Description is require"),
    price: yup.number().typeError("Price must be a number").required("asd"),
    type: yup.string().required("Type is require"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const formData = new FormData()
    const { avatars,...others} = data
    for (const key in others) {
      formData.append(key, data[key])
    }
    if (avatars.length > 0) {
        const lists = Object.keys(avatars).map(cur =>avatars[cur])
        lists.forEach(file =>{
          formData.append('avatars', file)
        })
    }
    
    try {
        const res = await axios.post(`${apiUrl}/admin/update`, formData)
        if (res.data.success) {
            setEditOpen(false)
            console.log(res.data);
        } else {
            console.log(res.data);
        }
    } catch (error) {
        
    }
  }
  const { editOpen, setEditOpen, editData } = props;
  const handlePreview = (e) => {
    const files = e.target.files;
    const imgPreviewBox = document.querySelector("#img__preview");
    imgPreviewBox.innerHTML = ``;
    if (files) {
      imgPreviewBox.style.padding = "10px";
    }
    const filesArray = Object.keys(files).map((cur) => files[cur]);
    filesArray.forEach((file) => {
      const img = document.createElement("img");
      img.setAttribute("src", URL.createObjectURL(file));
      imgPreviewBox.appendChild(img);
    });
  };
  return (
    <div className="adminedit" style={{ display: editOpen ? "flex" : "none" }}>
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" name="_id" defaultValue={editData._id} {...register('_id')} style={{display: 'none'}}/>
        <div className="form-group">
          <label htmlFor="">Name</label>
          <input type="text" name="name" defaultValue={editData.name} {...register('name')}/>
        </div>
        <p>{errors.name?.message}</p>
        <div className="form-group">
          <label htmlFor="">Description</label>
          <textarea
            type="text"
            name="description"
            defaultValue={editData.description}
            {...register('description')}
          />
        </div>
        <p>{errors.description?.message}</p>
        <div className="form-group">
          <label htmlFor="">Price</label>
          <input
            type="number"
            step="1000"
            name="price"
            defaultValue={editData.price}
            {...register('price')}
          />
        </div>
        <p>{errors.price?.message}</p>
        <div className="form-group">
          <label htmlFor="">Type</label>
          <input type="text" name="type" defaultValue={editData.type} {...register('type')} />
        </div>
        <p>{errors.type?.message}</p>
        <div className="form-group">
          <label htmlFor="">Images</label>
          <label htmlFor="imgsInput">Change</label>
          <input
            id="imgsInput"
            type="file"
            onInput={handlePreview}
            name="avatars"
            multiple
            {...register('avatars')}
          />
        </div>
        <div className="form-group">
          <label htmlFor=""></label>
          <div id="img__preview">
            {editData.images.map((img, idx) => {
              return <img src={`${apiUrl}/${img}`} key={idx} />;
            })}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor=""></label>
          <div style={{ width: "40%", display: "flex" }}>
            <button type="submit">update</button>
          </div>
        </div>
      </form>
      <button className="btn close__btn" onClick={() => setEditOpen(false)}>
        X
      </button>
    </div>
  );
};

export default Edit;
