import axios from "axios";
import "./productdetail.scss";
import { useLayoutEffect } from "react";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { apiUrl } from "../../contexts/constan";
import Header from "../../layouts/header/Header";
import Banner from "../section/Banner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { useSelector } from "react-redux";
import Footer from "../footer/Footer";
import Product from "../product/Product";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
const ProductDetail = (props) => {
  const { setToast } = useContext(AuthContext);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { productid } = useParams();
  const [productData, setProductData] = useState({
    loading: true,
    details: null,
    listRate: null,
  });
  const [comments, setComments] = useState({
    loading: true,
    comments: [],
  });
  const [prdAction, setPrdAction] = useState("review");
  const [cmtError, setCmtError] = useState("");
  const [selectedImg, setSelectedImg] = useState(0);
  const [timeLoadComment, setTimeLoadComment] = useState(1);
  const [products, setProducts] = useState({
    isLoading: true,
    data: null,
  });

  const getDetailData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/get/${productid}`);
      if (res.data.success) {
        console.log(res.data.listRate);
        setProductData({
          loading: false,
          details: res.data.data,
          listRate: res.data.listRate,
        });
      }
    } catch (error) {}
  };
  const getComments = async () => {
    try {
      const res = await axios.get(
        `${apiUrl}/cart/getcomments/${productid}/${timeLoadComment}`
      );
      if (res.data.success) {
        setComments((state) => {
          return {
            loading: false,
            comments: [...res.data.comments],
            total: res.data.total,
          };
        });
      } else {
        setToast({ success: res.data.success, message: res.data.message });
      }
    } catch (error) {}
  };
  useLayoutEffect(() => {
    getComments();
  }, [timeLoadComment]);
  useLayoutEffect(() => {
    getDetailData();
  }, []);
  useLayoutEffect(() => {
    getProducts();
  }, [productData]);
  const zoomBg = (e) => {
    const bg = e.target;
    const width = bg.offsetWidth;
    const height = bg.offsetHeight;
    const pX = ((e.clientX - bg.getBoundingClientRect().left) * 100) / width;
    const pY = ((e.clientY - bg.getBoundingClientRect().top) * 100) / height;
    bg.style.backgroundPosition = `${pX}% ${pY}%`;
    bg.style.backgroundSize = "200%";
  };

  const comment = async () => {
    const star = document.querySelector(`input[name='rating']:checked`).value;
    const commentText = document.querySelector(`#comment-area`).value;
    if (commentText !== "") {
      const commentContent = {
        rate: star,
        content: commentText,
      };
      if (isAuthenticated) {
        const res = await axios.post(
          `${apiUrl}/user/comment/${productid}`,
          commentContent
        );
        console.log(res);
      } else {
        setToast({ success: false, message: "You need log in to coment" });
      }
    } else {
      setCmtError("you need enter comment!");
      setTimeout(() => {
        setCmtError("");
      }, 3000);
    }
    document.querySelector(`#comment-area`).value = "";
    await getComments();
  };
  const getProducts = async () => {
    if (productData.details) {
      const type = productData.details.type;
      try {
        const res = await axios.get(`${apiUrl}/getproduct/${type}`);
        if (res.data.success) {
          setProducts({ isLoading: false, data: res.data.data });
        }
      } catch (error) {}
    }
  };
  const [amountProduct, setAmountProduct] = useState(1);
  const addProduct = async () => {
    try {
      if (isAuthenticated) {
        const res = await axios.post(`${apiUrl}/cart/add/${productid}`, {
          quanlity: amountProduct,
        });
        setToast({ success: res.data.success, message: res.data.message });
      } else {
        setToast({ success: false, message: "Login please" });
      }
    } catch (error) {}
  };
  return (
    <>
      <Header fixed={true} />
      <Banner />
      {productData.details && (
        <>
          <div className="pathdirect">
            <a href="/">Home</a>/ <a href="/shop">Shop</a>/
            {productData.details.name}
          </div>
          <div className="detail">
            <div className="detail__product">
              <div className="detail__product__images">
                <div
                  className="detail__product__images__bg"
                  style={{
                    backgroundImage: `url(${apiUrl}/${productData.details.images[selectedImg]})`,
                  }}
                  onMouseMove={zoomBg}
                  onMouseOut={(e) => {
                    e.target.style.backgroundSize = "cover";
                    e.target.style.backgroundPosition = "50% 50%";
                  }}
                ></div>

                <Swiper
                  navigation={true}
                  slidesPerView={4}
                  spaceBetween={10}
                  modules={[Navigation]}
                  className="detail__product__images__show"
                >
                  {productData.details.images.map((img, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <img
                          src={`${apiUrl}/${productData.details.images[index]}`}
                          alt=""
                          onClick={(e) => setSelectedImg(index)}
                          className={selectedImg === index ? "active" : ""}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>

              <div className="detail__product__content">
                <h1>{productData.details.name}</h1>
                <div className="rated">
                  <i className="fa-regular fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                  <div className="stars-rating" style={{ width: "50%" }}>
                    <div>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                    </div>
                  </div>
                </div>
                <h4 className="detail__product__content__desc">
                  {productData.details.description}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
                  cumque? Magni repellendus corporis laborum reprehenderit autem
                  aspernatur quos reiciendis quaerat? Perspiciatis consequatur
                  quaerat officiis iure tenetur saepe adipisci hic minima! Cum
                  ad architecto voluptatem voluptatum blanditiis dolorem tenetur
                  obcaecati, natus laborum voluptas porro quibusdam expedita
                  temporibus esse dolor eius distinctio veniam consequatur
                  laboriosam quam ex sapiente illum eum. Quidem, necessitatibus!
                </h4>
                <h4 className="detail__product__content__price">
                  <span>Price: </span>
                  {productData.details.price} $
                </h4>
                <div className="detail__product__content__add">
                  <input
                    type="number"
                    name="amount"
                    id=""
                    defaultValue={1}
                    onChange={(e) => {
                      setAmountProduct(e.target.value);
                    }}
                  />
                  <button
                    className="btn"
                    onClick={() => {
                      addProduct();
                    }}
                  >
                    Add to cart
                  </button>
                </div>
                <div className="detail__product__content__types">
                  <h4>
                    Types: <span>{productData.details.type}</span>
                  </h4>
                  <h4>
                    <span>
                      <i className="fa-regular fa-heart"></i>
                    </span>
                  </h4>
                </div>
                <div className="detail__product__content__policy">
                  <h4>Our policy</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ullam, architecto obcaecati! Sequi tempora voluptas vero,
                    illum, fugit nam quam ut similique maiores error ipsam quas
                    incidunt fugiat odio vitae veniam!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="product__side">
            <div className="product__side__actions">
              <div
                className={prdAction === "info" ? "active" : ""}
                onClick={() => setPrdAction("info")}
              >
                Infomations
              </div>
              <div
                className={prdAction === "review" ? "active" : ""}
                onClick={() => setPrdAction("review")}
              >
                Reviews
              </div>
            </div>
            <div className="product__side__container">
              <div
                className="product__side__container__info"
                style={{ display: prdAction === "info" ? "block" : "none" }}
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius
                corrupti sequi nam recusandae ullam sit, laudantium, eos
                officiis assumenda dolores architecto? Voluptate doloremque
                natus dolores, ut assumenda quasi libero corporis.
              </div>
              <div
                className="product__side__container__review"
                style={{ display: prdAction === "review" ? "flex" : "none" }}
              >
                <div className="users">
                  <div className="usercomment">
                    {comments.comments !== [] &&
                      comments.comments.map((comment, index) => {
                        return (
                          <div className="userreview" key={index}>
                            <div className="userreview__avt">
                              <img
                                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                alt=""
                              />
                            </div>
                            <div className="userreview__content">
                              <h1 className="userreview__content__name">
                                {comment.user.username}
                              </h1>
                              <div className="rated">
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                                <div
                                  className="stars-rating"
                                  style={{
                                    width: `${(comment.rate * 100) / 5}%`,
                                  }}
                                >
                                  <div>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                  </div>
                                </div>
                              </div>
                              <div className="userreview__content__commnet">
                                <p>{comment.content}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <div className="users__addmore">
                    <h1
                      style={{ display: comments.loading ? "block" : "none" }}
                    >
                      loading...
                    </h1>
                    <button
                      className="btn"
                      onClick={() => {
                        if (timeLoadComment < comments.total) {
                          setComments((state) => {
                            return {
                              ...state,
                              loading: true,
                            };
                          });
                          setTimeLoadComment((state) => ++state);
                        }
                      }}
                    >
                      Loadmore
                    </button>
                  </div>
                  <div className="user__commentbox">
                    <div className="user__commentbox__user">
                      <img
                        src="https://images.unsplash.com/photo-1662659512148-35f5ca4ee2a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=449&q=80"
                        alt=""
                      />
                      <h3>{user.username}</h3>
                    </div>
                    <div className="user__commentbox__area">
                      <div className="rating">
                        <span>Your rate:</span>
                        <input
                          type="radio"
                          name="rating"
                          defaultValue="1"
                          id="rating1"
                        />
                        <label htmlFor="rating1">
                          <i className="fa-solid fa-star"></i>
                        </label>
                        <input
                          type="radio"
                          name="rating"
                          defaultValue="2"
                          id="rating2"
                        />
                        <label htmlFor="rating2">
                          <i className="fa-solid fa-star"></i>
                        </label>
                        <input
                          type="radio"
                          name="rating"
                          defaultValue="3"
                          id="rating3"
                        />
                        <label htmlFor="rating3">
                          <i className="fa-solid fa-star"></i>
                        </label>
                        <input
                          type="radio"
                          name="rating"
                          defaultValue="4"
                          id="rating4"
                        />
                        <label htmlFor="rating4">
                          <i className="fa-solid fa-star"></i>
                        </label>
                        <input
                          type="radio"
                          name="rating"
                          defaultValue="5"
                          id="rating5"
                          defaultChecked="checked"
                        />
                        <label htmlFor="rating5">
                          <i className="fa-solid fa-star"></i>
                        </label>
                      </div>
                      <textarea
                        name=""
                        id="comment-area"
                        maxLength={200}
                        placeholder={"Limited by 200 characters"}
                      ></textarea>
                      <p>{cmtError === "" ? "" : cmtError}</p>
                      <button className="btn" onClick={() => comment()}>
                        Comment
                      </button>
                    </div>
                  </div>
                </div>
                <div className="users__rates">
                  <div className="users__rates__total">
                    <h4>Average rating</h4>
                    <p>{productData.listRate.rate}/5</p>
                    <div className="rated">
                      <i className="fa-regular fa-star"></i>
                      <i className="fa-regular fa-star"></i>
                      <i className="fa-regular fa-star"></i>
                      <i className="fa-regular fa-star"></i>
                      <i className="fa-regular fa-star"></i>
                      <div className="stars-rating" style={{ width: `${productData.listRate.rate * 100 / 5}%` }}>
                        <div>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </div>
                      </div>
                    </div>
                    <span>{productData.listRate.total} times</span>
                  </div>
                  <div className="users__rates__ratio">
                    <div className="users__rates__ratio__group">
                      <span>5 stars</span>
                      <div className="ratio-bar">
                        <div
                          className="ratio-bar-process"
                          style={{
                            width: `${
                              productData.listRate["5sao"] * 100/
                              productData.listRate.total
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span>{productData.listRate['5sao']} time</span>
                    </div>
                    <div className="users__rates__ratio__group">
                      <span>4 stars</span>
                      <div className="ratio-bar">
                        <div
                          className="ratio-bar-process"
                          style={{
                            width: `${
                              productData.listRate["4sao"] * 100/
                              productData.listRate.total
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span>{productData.listRate['4sao']} time</span>
                    </div>
                    <div className="users__rates__ratio__group">
                      <span>3 stars</span>
                      <div className="ratio-bar">
                        <div
                          className="ratio-bar-process"
                          style={{
                            width: `${
                              productData.listRate["3sao"] * 100/
                              productData.listRate.total
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span>{productData.listRate['3sao']} time</span>
                    </div>
                    <div className="users__rates__ratio__group">
                      <span>2 stars</span>
                      <div className="ratio-bar">
                        <div
                          className="ratio-bar-process"
                          style={{
                            width: `${
                              productData.listRate["2sao"] * 100/
                              productData.listRate.total
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span>{productData.listRate['2sao']} time</span>
                    </div>
                    <div className="users__rates__ratio__group">
                      <span>1 stars</span>
                      <div className="ratio-bar">
                        <div
                          className="ratio-bar-process"
                          style={{
                            width: `${
                              productData.listRate["1sao"] * 100/
                              productData.listRate.total
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span>{productData.listRate['1sao']} time</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="same__products">
            <h1>Same Products</h1>
            {products && products.isLoading && <h4>loading..</h4>}
            {products && products.data && (
              <Swiper
                slidesPerView={4}
                spaceBetween={10}
                modules={[Pagination, Navigation]}
                navigation={true}
                loop={true}
              >
                {products.data.map((prd, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <Product data={prd} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )}
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default ProductDetail;
