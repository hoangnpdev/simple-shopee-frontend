import { useEffect, useRef, useState } from 'react';
import './shoppe.css'
function Dangkyshop() {
    const taoshop = (e) => {
        let tenshop = document.getElementById("tenshop").value;
        let email = document.getElementById("email").value;
        let sodienthoai = document.getElementById("sodienthoai").value;
        let taoshop = { tenshop, email, sodienthoai };
        fetch('http://localhost:2003/taoshop', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taoshop)
        })
            .then(response => response.json())
            .then(manage => {
                if(manage){
                    window.alert('dang ky thanh cong');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
      };
    return (
        <>
            <div className='container-fluid'>
                <div className='row' style={{ height: '70vh' }}>
                    <div className='col-sm'></div>
                    <div className='col-sm-3 d-flex' >
                        <div className='border border-secondary rounded p-2 align-self-center ' style={{ height: '52vh', width: '100%' }}>
                            <div className='m-3 chudangkyshop'>Đăng ký shop</div>
                            <div className='m-3 chudangkyshop'>
                                <form>
                                    <div className="form-group ">
                                        <label>Tên shop:</label>
                                        <input type="text" className="form-control" id="tenshop" />
                                    </div>
                                    <div className="form-group ">
                                        <label>Email:</label>
                                        <input type="text" className="form-control" id="email" />
                                    </div>
                                    <div className="form-group " >
                                        <label>Số điện thoại:</label>
                                        <input type="text" className="form-control" id="sodienthoai" />
                                    </div>
                                    <button onClick={taoshop} type="submit" className="form-control mt-3" style={{ backgroundColor: '#EE4D2D', color: 'white' }}>Đăng ký</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm'></div>
                </div>
            </div>
        </>
    )
}
export default Dangkyshop;