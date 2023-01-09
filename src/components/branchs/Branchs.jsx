import './branchs.scss'
import { branch1, branch2, branch3, branch4, branch5 } from '../../assets/images'
const Branchs = () => {
    const branchs =[
        branch1,branch2,branch3, branch4, branch5
    ]
  return (
    <div className='brands'>
        <div className='title'>
            <h3>top brands</h3>
        </div>
        <div className="brands__layout">
            {branchs.map((brand, index)=>{
                return (
                    <div className="brands__layout__item" key={index}>
                        <a href="">
                            <img src={brand} alt="" />
                        </a>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Branchs