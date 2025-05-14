// import { QuestionCircleOutlined } from '@ant-design/icons'
// import { Button } from '@material-ui/core'
// import { Popconfirm } from 'antd'
// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { hoadoncanhanData, removehoadoncanhan, updatehoadoncanhan } from '../../../admin/Hoadoncanhan/hoadoncanhanSlice'
// import "./duyettour.css"
// export default function Duyettour() {
//     const dispatch = useDispatch()
//     const actionResult = async () => { await dispatch(hoadoncanhanData()) }
//     const infor = useSelector(state => state.infor.infor.data);
//     const hoadoncanhans = useSelector(state => state.hoadoncanhans.hoadoncanhan.data);
//     const hoadon = [];
//     if (hoadoncanhans && infor) {
//         for (let i = 0; i < hoadoncanhans.length; i++) {
//             if (hoadoncanhans[i].userId === infor.id && hoadoncanhans[i].agree === 0) {
//                 hoadon.push(hoadoncanhans[i])
//             }
//         }
//     }
//     const chitiettour = (luuy) => {
//         setSelectedTourDetail(luuy);
//         setModalVisible(true);
//     };
    
//     const dongy = (e) => {
//         dispatch(updatehoadoncanhan({ agree: 1, idsua: e }))
//         setTimeout(() => {
//             actionResult();
//         }, 500);
//     }
//     const huy = (e) => {
//         dispatch(removehoadoncanhan(e))
//         setTimeout(() => {
//             actionResult();
//         }, 500);
//     }
//     useEffect(() => {
//         actionResult();
//     }, [])
//     return (
//         <div className="duyettour">
//             <div className="duyettour__header">
//                 <h3 className='text-center'>Duyệt tour</h3>
//                 <div className="hr"></div>
//             </div>
//             <div className="container">
//                 <div className="duyettour__content">
//                     {hoadon.length === 0 ? "" :
//                         hoadon.map((ok, index) => (
//                             <div className="duyettour__box" key={index}>
//                                 <div className="duyettour--name">
//                                     {ok.diadiemdi}
//                                 </div>
                                
//                                 <div className="duyettour--form">
//                                     <div className="giatour">
//                                         {(typeof ok.giatien === 'number') ? `${ok.giatien.toLocaleString()} vnđ` : "Giá không xác định"}
//                                     </div>
//                                     {/* <div className="chitiettour mt-2">
//                                         <strong>Chi tiết tour:</strong><br />
//                                         <span>{ok.luuy || "Không có thông tin chi tiết"}</span>
//                                     </div> */}
//                                 </div>

//                                 <div className="btn__tour">
//                                     {/* <Popconfirm title="Bạn có chắc chắn？" onConfirm={() => { chitiettour(ok.id) }} icon={<QuestionCircleOutlined style={{ color: 'green' }} />}>
//                                         <Button color="primary" variant="contained" className="mr-1">Đồng ý</Button>
//                                     </Popconfirm> */}
//                                     <Popconfirm title="Bạn có chắc chắn？" onConfirm={() => { dongy(ok.id) }} icon={<QuestionCircleOutlined style={{ color: 'green' }} />}>
//                                         <Button color="primary" variant="contained" className="mr-1">Đồng ý</Button>
//                                     </Popconfirm>
//                                     <Popconfirm title="Bạn có chắc chắn？" onConfirm={() => { huy(ok.id) }} icon={<QuestionCircleOutlined style={{ color: 'green' }} />}>
//                                         <Button color="secondary" variant="contained">Huỷ</Button>
//                                     </Popconfirm>
//                                 </div>
//                             </div>

//                         ))
//                     }
//                 </div>
//             </div>
//         </div>
//     )
// }
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button } from '@material-ui/core';
import { Modal, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  hoadoncanhanData,
  removehoadoncanhan,
  updatehoadoncanhan
} from '../../../admin/Hoadoncanhan/hoadoncanhanSlice';
import './duyettour.css';

export default function Duyettour() {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTourDetail, setSelectedTourDetail] = useState("");

  const actionResult = async () => {
    await dispatch(hoadoncanhanData());
  };

  const infor = useSelector(state => state.infor.infor.data);
  const hoadoncanhans = useSelector(state => state.hoadoncanhans.hoadoncanhan.data);
  const hoadon = [];

  if (hoadoncanhans && infor) {
    for (let i = 0; i < hoadoncanhans.length; i++) {
      if (hoadoncanhans[i].userId === infor.id && hoadoncanhans[i].agree === 0) {
        hoadon.push(hoadoncanhans[i]);
      }
    }
  }

  const dongy = (e) => {
    dispatch(updatehoadoncanhan({ agree: 1, idsua: e }));
    setTimeout(() => {
      actionResult();
    }, 500);
  };

  const huy = (e) => {
    dispatch(removehoadoncanhan(e));
    setTimeout(() => {
      actionResult();
    }, 500);
  };

  const chitiettour = (luuy) => {
    setSelectedTourDetail(luuy);
    setModalVisible(true);
  };

  useEffect(() => {
    actionResult();
  }, []);

  return (
    <div className="duyettour">
      <div className="duyettour__header">
        <h3 className='text-center'>Duyệt tour</h3>
        <div className="hr"></div>
      </div>
      <div className="container">
        <div className="duyettour__content">
          {hoadon.length === 0 ? "" :
            hoadon.map((ok, index) => (
              <div className="duyettour__box" key={index}>
                <div className="duyettour--name">
                  {ok.diadiemdi}
                </div>
                <div className="duyettour--form">
                  <div className="giatour">
                    {(typeof ok.giatien === 'number') ? `${ok.giatien.toLocaleString()} vnđ` : "Giá không xác định"}
                  </div>
                </div>
                <div className="btn__tour">
                  <Popconfirm title="Bạn có chắc chắn？" onConfirm={() => { dongy(ok.id) }} icon={<QuestionCircleOutlined style={{ color: 'green' }} />}>
                    <Button color="primary" variant="contained" className="mr-1">Đồng ý</Button>
                  </Popconfirm>
                  <Popconfirm title="Bạn có chắc chắn？" onConfirm={() => { huy(ok.id) }} icon={<QuestionCircleOutlined style={{ color: 'green' }} />}>
                    <Button color="secondary" variant="contained" className="mr-1">Huỷ</Button>
                  </Popconfirm>
                  <Button variant="outlined" onClick={() => chitiettour(ok.luuy)}>Chi tiết</Button>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      <Modal
        title="Chi tiết tour"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <p style={{ whiteSpace: "pre-wrap" }}>
          {selectedTourDetail || "Không có chi tiết tour"}
        </p>
      </Modal>
    </div>
  );
}
