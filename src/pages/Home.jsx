import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import NotificationList from '../components/Notification/NotificationList';
import Notifications from '../mockdata/Notifications';
import News from '../mockdata/News';

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
        </PageWrapper>
    )
}

export default Home;