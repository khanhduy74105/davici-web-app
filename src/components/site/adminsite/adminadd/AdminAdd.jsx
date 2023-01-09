import "./adminadd.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { apiUrl } from "../../../../contexts/constan";
import AdminLayout from "../adminlayout/AdminLayout";

const AdminAdd = () => {
  const schema = yup.object().shape({
    name: yup.string().required("username is require"),
    description: yup.string().required("Description is require"),
    price: yup.number().typeError('Price must be a number').required('asd'),
    type: yup.string().required("Type is require"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handlePreview = (e)=>{
    const files = e.target.files
    const imgPreviewBox = document.querySelector('#img__preview')
    imgPreviewBox.innerHTML =``
    if (files) {
      imgPreviewBox.style.padding='10px'
    }
    const filesArray = Object.keys(files).map(cur => files[cur])
    console.log(filesArray);
    filesArray.forEach(file =>{
      const img = document.createElement('img')
      img.setAttribute('src', URL.createObjectURL(file))
      imgPreviewBox.appendChild(img)
    })
  }
  const onSubmit = async (data) => {
    const formData = new FormData()
    const { avatars,...others} = data
    const lists = Object.keys(avatars).map(cur =>avatars[cur])
    for (const key in others) {
      formData.append(key, data[key])
    }
    lists.forEach(file =>{
      formData.append('avatars', file)
    })
    try {
      const res = await axios.post(`${apiUrl}/admin/create`, formData ,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
     })
      if (res.data.success) {
        console.log('success');
      }
    } catch (error) {
     console.log(error);
    }
  };
  return (
    <AdminLayout >
      <div className="add__product">
        <h3>Add new product</h3>
        <form method="post" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="">Name</label>
            <input type="text" name="name" {...register("name")} />
            <p>{errors.name?.message}</p>
          </div>
          <div className="form-group">
            <label htmlFor="">Description</label>
            <textarea type="text" name="description" {...register("description")} />
            <p>{errors.description?.message}</p>
          </div>
          <div className="form-group">
            <label htmlFor="">Price</label>
            <input type="number" step='1000' name="price" {...register("price")} />
            <p>{errors.price?.message}</p>
          </div>
          <div className="form-group">
            <label htmlFor="">Type</label>
            <input type="text" name="type" {...register("type")} />
            <p>{errors.type?.message}</p>
          </div>
          <div className="form-group">
            <label htmlFor="">Images</label>
            <label htmlFor="imgsInput">Select</label>
            <input id="imgsInput" type="file" onInput={handlePreview} name="avatars" {...register("avatars")}  multiple/>
            <p>{errors.avatar?.message}</p>
          </div>
          <div className="form-group">
            <label htmlFor=""></label>
            <div id="img__preview">
            </div>
          </div>
          <div className="form-group">
            <label htmlFor=""></label>
            <div style={{width: '40%', display: "flex"}}>
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminAdd;
