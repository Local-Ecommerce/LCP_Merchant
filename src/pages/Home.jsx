import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import NotificationList from '../components/Notification/NotificationList';
import Notifications from '../mockdata/Notifications';
import News from '../mockdata/News';

import { db } from "../firebase";
import { set, push, ref, remove, update, get, child, onValue } from "firebase/database";

const PageWrapper = styled.form`
    min-width: 1000px;
    max-width: 1200px;
    margin: 50px auto;
`;

const Flex = styled.div`
    display: flex;
    align-items: flex-start;
`;

const LeftWrapper = styled.div`
    flex: 3.5;
    margin-right: 30px;
`;

const RightWrapper = styled.div`
    flex: 5;
`;

const TabWrapper = styled.div`
    margin-bottom: 20px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    background-color: #fff;
    border-radius: 5px;
`;

const Tab = styled.div`
    overflow: hidden;
    border-radius: 5px;
`;

const TabHeader = styled.div`
    text-align: ${props => props.center ? "center" : "left"};
    padding: 16px;
    font-size: 15px;
    font-weight: 600;
`;

const TabBody = styled.div`
    border-top: 1px solid #dee2e6;
    max-height: ${props => props.height};
    overflow: scroll;

    &&::-webkit-scrollbar {
        display: none;
    }
`;

const Home = () => {
    const user = JSON.parse(localStorage.getItem('USER'));
    const [time, setTime] = useState(DateTime.fromISO(localStorage.getItem('EXPIRED_TIME')).diffNow().toObject().milliseconds);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTime(DateTime.fromISO(localStorage.getItem('EXPIRED_TIME')).diffNow().toObject().milliseconds);
        }, 1000);
      
        return () => clearTimeout(timer);
    });

    const readFromDatabase = (e) => {
        e.preventDefault();

        const starCountRef = ref(db, `Notification/` + user.Residents[0].ResidentId);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data);
        });

        // const dbRef = ref(db);
        // get(child(dbRef, `aaa`)).then((snapshot) => {
        //     if (snapshot.exists()) {
        //         console.log(snapshot.val());
        //     } else {
        //         console.log("No data available");
        //     }
        // }).catch((error) => {
        //   console.error(error);
        // });
    }

    const insertApprove = (e) => {
        e.preventDefault();

        push(ref(db, `Notification/` + user.Residents[0].ApartmentId), {
            createdDate: Date.now(),
            data: {
                name: 'Cửa hàng của Nhân'
            },
            read: 0,
            receiverId: user.Residents[0].ApartmentId,
            senderId: 'R001',
            type: '101'
        }).then(
            console.log("ok")
        );
    };

    const insertApproveStore = (e) => {
        e.preventDefault();

        push(ref(db, `Notification/` + user.Residents[0].ResidentId), {
            createdDate: Date.now(),
            data: {
                name: 'Cửa hàng của Nhân'
            },
            read: 0,
            receiverId: 'ZrPXVdC3H3YgEmm5HiqtgBjOXUx1',
            senderId: 'R001',
            type: '101'
        }).then(
            console.log("ok")
        );
    };

    const insertReject = (e) => {
        e.preventDefault();

        push(ref(db, `Notification/` + user.Residents[0].ResidentId), {
            createdDate: Date.now(),
            data: {
                image: 'https://firebasestorage.googleapis.com/v0/b/lcp-mobile-8c400.appspot.com/o/Product%2FPD_yg50vK1rdJGmyAYF%2FImage1?alt=media&token=155581a0-a3e8-4b73-8e01-63ab085bc6f0',
                name: 'Bánh mì 20 trứng',
                id: 'P002',
                reason: 'Tên không hợp lệ'
            },
            read: 0,
            receiverId: 'ZrPXVdC3H3YgEmm5HiqtgBjOXUx1',
            senderId: 'R001',
            type: '002'
        }).then(
            console.log("ok")
        );
    };

    const insertRejectStore = (e) => {
        e.preventDefault();

        push(ref(db, `Notification/` + user.Residents[0].ResidentId), {
            createdDate: Date.now(),
            data: {
                name: 'Cửa hàng của Nhân',
                reason: 'Tên không hợp lệ'
            },
            read: 0,
            receiverId: 'ZrPXVdC3H3YgEmm5HiqtgBjOXUx1',
            senderId: 'R001',
            type: '102'
        }).then(
            console.log("ok")
        );
    };

    const handleSubmitChange = (e) => {
        e.preventDefault();

        update(ref(db, `Notification/` + user.Residents[0].ResidentId), {
            createdDate: Date.now(),
            itemId: "P002",
            read: 0,
            receiverId: 'ZrPXVdC3H3YgEmm5HiqtgBjOXUx1',
            senderId: 'R001',
            type: '001'
        }).then(
            console.log("ok")
        );
    };

    const handleDelete = (e) => {
        e.preventDefault();

        remove(ref(db, `/aaa`)).then(
            console.log("ok")
        );
    };

    return (
        <PageWrapper>
            <Flex>
                <LeftWrapper>
                    <TabWrapper>
                        <Tab>
                            <TabHeader center>Thông báo hệ thống</TabHeader>

                            <TabBody height="500px">
                                <NotificationList currentItems={Notifications} />
                            </TabBody>
                        </Tab>
                    </TabWrapper>
                </LeftWrapper>

                <RightWrapper>
                    <TabWrapper>
                        <Tab>
                            <TabHeader center>Tin mới</TabHeader>

                            <TabBody height="215px">
                                <NotificationList currentItems={News} />
                            </TabBody>
                        </Tab>
                    </TabWrapper>

                    <TabWrapper>
                        <Tab>
                            <TabHeader center>POI</TabHeader>

                            <TabBody height="215px">
                                <NotificationList currentItems={News} />
                            </TabBody>
                        </Tab>
                    </TabWrapper>
                </RightWrapper>
            </Flex>

            <br/><br/>=============================
            <br/><br/>Token Expire Time: {localStorage.getItem('EXPIRED_TIME')}
            <br/><br/>Time left until expire: {time} milliseconds
            <br/><br/>Access Token: {localStorage.getItem('ACCESS_TOKEN')}
            <br/><br/>Refresh Token: {localStorage.getItem('REFRESH_TOKEN')}
            <br/><br/>role: {user && user.RoleId === "R001" && user.Residents[0].Type === "Merchant" ? user.Residents[0].Type : null}
            <br/><br/><button onClick={readFromDatabase}>Test read</button>
            <br/><br/><button onClick={insertApprove}>insert approve product</button>
            <br/><br/><button onClick={insertReject}>insert reject product</button>
            <br/><br/><button onClick={insertApproveStore}>insert approve store</button>
            <br/><br/><button onClick={insertRejectStore}>insert reject store</button>
            <br/><br/><button onClick={handleSubmitChange}>Test update</button>
            <br/><br/><button onClick={handleDelete}>Test delete</button>
        </PageWrapper>
    )
}

export default Home;