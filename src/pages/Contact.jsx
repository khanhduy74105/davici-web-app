import React, { useContext } from 'react'
import './contact.scss'
import { bgAbout } from '../assets/images'
import Footer from '../components/footer/Footer'
import Header from '../layouts/header/Header'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthContext } from '../contexts/authContext'
import axios from 'axios'
import { apiUrl } from '../contexts/constan'
import { useState } from 'react'
const Contact = () => {
    const [sending, setSending] = useState(false)
    const {setToast} = useContext(AuthContext)
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const schema = yup.object().shape({
        name: yup.string().required("Name is require").min('6',"username min length is 6"),
        email: yup.string().required("Email is require").matches(emailRegex),
        questions: yup.string().min(1,'Min 20 characters')
    })
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    });
    const onSend = async (data)=>{
        try {
            setSending(true)
            const res = await axios.post(`${apiUrl}/sendmail`, data)
            setSending(false)
            setToast(res.data)
        } catch (error) {
            
        }
    }
  return (
    <>
        <Header />
        <div className="contact">
            <div
                className="contact__banner"
                style={{ backgroundImage: `url(${bgAbout})` }}
            >
                <h3>Contact</h3>
                <p>
                <a href="/">Home</a>/ <a href="#">Contact</a>
                </p>
            </div>
            <div className="contact__board">
                <div className="contact__board__left">
                    <div className="contact__board__left__header">
                        <h5>Davici furniture</h5>
                        <h4>Get in touch</h4>
                    </div>
                    <div className="contact__board__left__brief">
                        <p>Vietnam - Korea university <br /> Da Nang - Viet Nam</p>
                        <p>Email: khanhduy74105@gmail.com</p>
                        <p>Phone: 0941972159</p>
                    </div>
                    <div className="contact__board__left__social">
                        <h3>Follow me!</h3>
                        <div>
                            <a href="https://www.facebook.com/profile.php?id=100021766815638">
                                <i className="fa-brands fa-facebook-f"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/duy-nguy%E1%BB%85n-th%C3%A1i-kh%C3%A1nh-837b0725b/">
                                <i className="fa-brands fa-linkedin"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="contact__board__right">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1555.539379722716!2d108.25199698449495!3d15.975882242081648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142108997dc971f%3A0x1295cb3d313469c9!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgVGjDtG5nIHRpbiB2w6AgVHJ1eeG7gW4gdGjDtG5nIFZp4buHdCAtIEjDoG4!5e0!3m2!1svi!2s!4v1673060583260!5m2!1svi!2s"
                        width={'100%'}
                        height={450}
                        style={{border : 0}}
                    >
                    </iframe>
                </div>
            </div>
            <div className="contact__sendmail">
                <h3>have an question ? contact us !</h3>
                <form action="" onSubmit={handleSubmit(onSend)}>
                    <div>
                        <div>
                            <input type="text" placeholder='Your name' {...register('name')} name='name'/>
                            <p>{errors.name?.message}</p>
                        </div>
                        <div>
                            <input type="email" placeholder='Your email' {...register('email')} name='email'/>
                            <p>{errors.email?.message}</p>
                        </div>
                    </div>
                    <div>
                        <textarea placeholder='Your questions in here' {...register('questions')} name="questions" id="" cols="30" rows="10"></textarea>
                    </div>
                    <p>{errors.questions?.message}</p>
                    <button className='btn'>{sending? 'Sending...' : 'Send'}</button>
                </form>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default Contact