import React, { useState } from "react";
import { Row, Col,Card, Button, Container } from "react-bootstrap";
import { withStdTopNav, withStdBottomNav } from "../HOC/NavHOC";
import ExampleComponent from "react-rounded-image";

import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { db } from "../../firebase";
import * as firebase from "firebase/app";
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';


export const Profile = withStdBottomNav(withStdTopNav(() => {
   
    const [name,setName] = useState("-");
    const [phone,setPhone] = useState("-"); 
    const [address,setAddress] = useState("-");
    const [image,setImage] = useState("/images/blank.jpg");
    var email=firebase.auth().currentUser.email;
    const fetchOperation = async () => {
    await db.collection("Users").where("email","==",email).get().then((snapshot)=>{
        snapshot.forEach((user)=>{
            var data = user.data();
            setName(data["name"]);
            setPhone(data["phone"]);
            setAddress(data["address"]);
            setImage(data["image"]);
        })
        console.log("hey");
    }).catch((err)=>{
        console.log(err); 
    });
    }
    fetchOperation();
    function handleClick() {
        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
          }, function(error) {
            console.error('Sign Out Error', error);
          });
    }
    return (
        <Container>
            <br />
            <br />
            <Row style={{ height: "80vh" }} className="align-items-center">
                <Col />
                <Col sm={10} md={6} lg={4}>
                    <div style={{marginLeft: '30%', marginBottom:'20px'}}>
                        <ExampleComponent 
                            image={image}
                            roundedColor="#321124"
                            imageWidth="150"
                            imageHeight="150"
                            roundedSize="13"
                        />
                    </div>
                    <span className="text-center" value={{name}}></span>
                    <br />
                    <Button style={{marginLeft: '41%', marginBottom:'30px'}} variant="primary">
                    <EditOutlinedIcon />   Edit
                    </Button>
                    <br />
                    <Card style={{marginLeft: '12%', width: "85%", marginBottom:'40px', padding:"3%"}}>
                        <span><MailOutlineIcon /><span style={{ marginLeft: '10px', }} >{email}</span></span>
                    </Card>
                    <Card style={{marginLeft: '12%', width: "85%", marginBottom:'40px', padding:"3%"}}>
                        <span><PhoneAndroidIcon /><span style={{ marginLeft: '10px'}} >{phone}</span></span>
                    </Card>
                    <Card style={{marginLeft: '12%', width: "85%", marginBottom:'40px', padding:"3%"}}>
                        <span><RoomOutlinedIcon /><span style={{ marginLeft: '10px'}} >{address}</span></span>
                    </Card>

                    <Button style={{marginLeft: '42%', marginTop:'25%'}} variant="danger" onClick={handleClick}>
                           Logout
                    </Button>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </Col>
                <Col />
            </Row>
        </Container>
    );
}));
