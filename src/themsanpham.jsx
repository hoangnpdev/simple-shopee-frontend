import { useEffect, useRef, useState } from 'react';
import './shoppe.css'
function Themsanpham() {
    // dang san pham moi
    let [anh, setAnh] = useState();
    let [xemtruoc, setXemtruoc] = useState('');
    let [doidanhmuc, setDoidanhmuc] = useState('');
    let [count, setCount] = useState([]);

    // cap nhat san pham da dang
    let [hienbaisua, setHienbaisua] = useState();
    let [src, setSrc] = useState('');
    let [tensp, setTensp] = useState('');
    let [phanloai, setPhanloai] = useState('');
    let [giatien, setGiatien] = useState('');
    let [tonkho, setTonkho] = useState('');
    let [mota, setMota] = useState('');

    // dung de khi state se khon bị xoa du lieu
    let dulieu = useRef({});

    // lay anh tu may 
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAnh(reader.result);
                dulieu.src = reader.result;
                setXemtruoc(true);
            };
            reader.readAsDataURL(file);
        }
    };
    useEffect(() => {
        // dang san pham moi
        fetch('http://localhost:2003/hiendanhmuc', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ exampleKey: 'exampleValue' })
        })
            .then(response => response.json())
            .then(manage => {
                setCount(manage);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        // cap nhat san pham
        let idbaisua = window.location.href.split('/').pop();
        fetch('http://localhost:2003/suabai', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idbaisua })
        })
            .then(response => response.json())
            .then(suabai => {
                console.log(suabai);
                if (window.location.href == 'http://localhost:1800/themsanpham') {
                    setHienbaisua(true);
                } else {
                    setHienbaisua(false);
                    setSrc(suabai[0].src);
                    setTensp(suabai[0].tensp);
                    setPhanloai(suabai[0].phanloai);
                    setGiatien(suabai[0].giatien);
                    setTonkho(suabai[0].tonkho);
                    setMota(suabai[0].mota);
                    dulieu.idbaisua = suabai[0].idsanpham;
                    dulieu.src = suabai[0].src;
                    dulieu.tensp = suabai[0].tensp;
                    dulieu.phanloai = suabai[0].phanloai;
                    dulieu.giatien = suabai[0].giatien;
                    dulieu.tonkho = suabai[0].tonkho;
                    dulieu.mota = suabai[0].mota;
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    // dangsanpham
    const laydulieu = (hg1) => {
        dulieu.tensp = hg1.target.value;
    }
    const laydulieu1 = (hg1) => {
        dulieu.giatien = hg1.target.value;
    }
    const laydulieu2 = (hg1) => {
        dulieu.tonkho = hg1.target.value;
    }
    const laydulieu3 = (hg1) => {
        dulieu.mota = hg1.target.value;
    }
    const laydulieu4 = (hg1) => {
        setDoidanhmuc(hg1);
        dulieu.phanloai = hg1;
        window.alert(hg1);
    }

    // cap nhat san pham

    const laydulieu5 = (hg1) => {
        setTensp(hg1.target.value);
        dulieu.tensp = hg1.target.value;
    }
    const laydulieu6 = (hg1) => {
        setGiatien(hg1.target.value);
        dulieu.giatien = hg1.target.value;
    }
    const laydulieu7 = (hg1) => {
        setTonkho(hg1.target.value);
        dulieu.tonkho = hg1.target.value;
    }
    const laydulieu8 = (hg1) => {
        setMota(hg1.target.value);
        dulieu.mota = hg1.target.value;
    }

    // api post
    const post = () => {
        fetch('http://localhost:2003/post', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dulieu)
        })
            .then(response => response.json())
            .then(manage => {
                if (manage) {
                    window.alert('Đã thêm sản phẩm');
                    window.location.href = 'http://localhost:1800/themsanpham';
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    // api cap nhat
    const update = () => {
        fetch('http://localhost:2003/update', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dulieu)
        })
            .then(response => response.json())
            .then(manage => {
                if (manage) {
                    window.alert('Cập nhật sản phẩm thành công');
                    window.location.href = 'http://localhost:1800/quanlysanpham';
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    return (
        <>
            {hienbaisua ?
                <div className='row d-flex align-items-start'>
                    <div className='col-sm-2 d-flex justify-content-center mt-2' style={{ minHeight: 100, }}>
                        <div className='w-75 p-2 border rounded'>
                            <ul className='list-unstyled'>
                                <li style={{ color: '#999', fontWeight: 600 }}>Gợi ý điền thông tin</li>
                                <ul className='list-unstyled' style={{ paddingLeft: '1rem' }}>
                                    <li>Thêm hình ảnh</li>
                                    <li>Tên sản phẩm có ít nhất 25~100 kí tự</li>
                                </ul>
                            </ul>
                        </div>
                    </div>
                    <div className='col-sm-9 border rounded mt-2'>
                        <div className='chudep p-2'>Thông tin cơ bản</div>
                        <div className='row'>
                            <div className='col-sm-2'>
                                <div className='d-flex justify-content-end'>Hình ảnh sản phẩm</div>
                            </div>
                            <div className='col-sm-10'>
                                <div>Hình ảnh tỉ lệ 1:1</div>
                                <input type="file" onChange={handleFileChange} className="annut" id="customFile" name="filename" />
                                <div><button type="button" onClick={() => document.getElementById('customFile').click()} className="themhinhanh"><i className="fa-regular fa-image"></i>Thêm hình ảnh</button></div>
                            </div>
                        </div> <br />
                        {xemtruoc ? <div className='row'>
                            <div className='col-sm-2'>
                                <div className='d-flex justify-content-end'>Ảnh bìa</div>
                            </div>
                            <div className='col-sm-10'>
                                <img src={anh} className='themanhbia d-flex justify-content-center align-items-center' /><br />
                            </div>
                        </div> :
                            <div className='row'>
                                <div className='col-sm-2'>
                                    <div className='d-flex justify-content-end'>Ảnh bìa</div>
                                </div>
                                <div className='col-sm-10'>
                                    <div className='themanhbia d-flex justify-content-center align-items-center'><i className="fa-regular fa-image"></i></div><br />
                                </div>
                            </div>}
                        <div className='row'>
                            <div className='col-sm-2'>
                                <div className='d-flex justify-content-end' >Tên sản phẩm</div>
                            </div>
                            <div className='col-sm-10'>
                                <input type="text" className="dienthongtin" id='tensanpham' onChange={laydulieu} />
                            </div>
                        </div><br />
                        <div className='row'>
                            <div className='col-sm-2'>
                                <div className='d-flex justify-content-end'>Ngành hàng</div>
                            </div>
                            <div className='col-sm-10'>
                                <button type="text" className="dienthongtin" data-toggle="modal" data-target="#myModal"><i className="fa-solid fa-pen d-flex justify-content-end"></i></button>
                                <div className="modal fade" id="myModal">
                                    <div className="modal-dialog  modal-dialog-centered modal-lg">
                                        <div className="modal-content">
                                            <div className="modal-header d-flex justify-content-end">
                                                <button type="button" className="close " data-dismiss="modal">&times;</button>
                                            </div>
                                            <div className="modal-body row">
                                                <div className='col-sm-6'>
                                                    <table className="table table-striped">
                                                        <tbody>
                                                            {count.map((drama) =>
                                                                <tr key={drama.iddanhmuc} >
                                                                    <td className='dongdanhmuc' data-dismiss="modal" onClick={() => laydulieu4(drama.tendanhmuc)}>{drama.tendanhmuc}</td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className='col-sm-6'></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div><br />
                        <div className='row'>
                            <div className='col-sm-2'>
                                <div className='d-flex justify-content-end'>Giá tiền</div>
                            </div>
                            <div className='col-sm-10'>
                                <input type="text" className="dienthongtin" id='giatien' onChange={laydulieu1} />
                            </div>
                        </div><br />
                        <div className='row'>
                            <div className='col-sm-2'>
                                <div className='d-flex justify-content-end'>Số lượng trong kho</div>
                            </div>
                            <div className='col-sm-10'>
                                <input type="text" className="dienthongtin" id='tonkho' onChange={laydulieu2} />
                            </div>
                        </div><br />
                        <div className='row'>
                            <div className='col-sm-2'>
                                <div className='d-flex justify-content-end'>Mô tả sản phẩm</div>
                            </div>
                            <div className='col-sm-10'>
                                <textarea className='mota' id='mota' rows='7' onChange={laydulieu3}></textarea>
                            </div>
                        </div><br />
                        <div className='row'>
                            <div className='col-sm-12 d-flex justify-content-end luu '>
                                <button type="button" className="btn btn-secondary" onClick={post}>Lưu và hiển thị</button>
                            </div>
                        </div><br />
                    </div>
                    <div className='col-sm-1'></div>
                </div>
                :
                <div className='row d-flex align-items-start'>
                    <div className='col-sm-2 d-flex justify-content-center mt-2' style={{ minHeight: 100, }}>
                        <div className='w-75 p-2 border rounded'>
                            <ul className='list-unstyled'>
                                <li style={{ color: '#999', fontWeight: 600 }}>Gợi ý điền thông tin</li>
                                <ul className='list-unstyled' style={{ paddingLeft: '1rem' }}>
                                    <li>Thêm hình ảnh</li>
                                    <li>Tên sản phẩm có ít nhất 25~100 kí tự</li>
                                </ul>
                            </ul>
                        </div>
                    </div>
                    <div className='col-sm-9 border rounded mt-2'>
                        <div className='chudep p-2'>Thông tin cơ bản</div>
                        <div className='row'>
                            <div className='col-sm-2'>
                                <div className='d-flex justify-content-end'>Hình ảnh sản phẩm</div>
                            </div>
                            <div className='col-sm-10'>
                                <div>Hình ảnh tỉ lệ 1:1</div>
                                <input type="file" onChange={handleFileChange} className="annut" id="customFile" name="filename" />
                                <div><button type="button" onClick={() => document.getElementById('customFile').click()} className="themhinhanh"><i className="fa-regular fa-image"></i>Thêm hình ảnh</button></div>
                            </div>
                        </div> <br />
                        {xemtruoc ? <div className='row'>
                            <div className='col-sm-2'>
                                <div className='d-flex justify-content-end'>Ảnh bìa</div>
                            </div>
                            <div className='col-sm-10'>
                                <img src={anh} className='themanhbia d-flex justify-content-center align-items-center' /><br />
                            </div>
                        </div> :
                            <div className='row'>
                                <div className='col-sm-2'>
                                    <div className='d-flex justify-content-end'>Ảnh bìa</div>
                                </div>
                                <div className='col-sm-10'>
                                    <div className='themanhbia d-flex justify-content-center align-items-center'> <img src={src} className='themanhbia d-flex justify-content-center align-items-center' /></div><br />
                                </div>
                            </div>}
                        <div className='row'>
                            <div className='col-sm-2'>
                                <div className='d-flex justify-content-end' >Tên sản phẩm</div>
                            </div>
                            <div className='col-sm-10'>
                                <input type="text" className="dienthongtin" id='tensanpham' value={tensp} onChange={laydulieu5} />
                            </div>
                        </div><br />
                        <div className='row'>
                            <div className='col-sm-2'>
                                <div className='d-flex justify-content-end'>Ngành hàng</div>
                            </div>
                            <div className='col-sm-10'>
                                <button type="text" className="dienthongtin" data-toggle="modal" data-target="#myModal"><i className="fa-solid fa-pen d-flex justify-content-end"></i></button>
                                <div className="modal fade" id="myModal">
                                    <div className="modal-dialog  modal-dialog-centered modal-lg">
                                        <div className="modal-content">
                                            <div className="modal-header d-flex justify-content-end">
                                                <button type="button" className="close " data-dismiss="modal">&times;</button>
                                            </div>
                                            <div className="modal-body row">
                                                <div className='col-sm-6'>
                                                    <table className="table table-striped">
                                                        <tbody>
                                                            {count.map((drama) =>
                                                                <tr key={drama.iddanhmuc} >
                                                                    <td className='dongdanhmuc' onClick={() => laydulieu4(drama.tendanhmuc)}>{drama.tendanhmuc}</td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className='col-sm-6'></div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div><br />
                        <div className='row'>
                            <div className='col-sm-2'>
                                <div className='d-flex justify-content-end'>Giá tiền</div>
                            </div>
                            <div className='col-sm-10'>
                                <input type="text" className="dienthongtin" value={giatien} id='giatien' onChange={laydulieu6} />
                            </div>
                        </div><br />
                        <div className='row'>
                            <div className='col-sm-2'>
                                <div className='d-flex justify-content-end'>Số lượng trong kho</div>
                            </div>
                            <div className='col-sm-10'>
                                <input type="text" className="dienthongtin" value={tonkho} id='tonkho' onChange={laydulieu7} />
                            </div>
                        </div><br />
                        <div className='row'>
                            <div className='col-sm-2'>
                                <div className='d-flex justify-content-end'>Mô tả sản phẩm</div>
                            </div>
                            <div className='col-sm-10'>
                                <textarea className='mota' id='mota' rows='7' value={mota} onChange={laydulieu8}></textarea>
                            </div>
                        </div><br />
                        <div className='row'>
                            <div className='col-sm-12 d-flex justify-content-end luu '>
                                <button type="button" className="btn btn-secondary" onClick={update}>Lưu và hiển thị</button>
                            </div>
                        </div><br />
                    </div>
                    <div className='col-sm-1'></div>
                </div>
            }
        </>
    )

}
export default Themsanpham;