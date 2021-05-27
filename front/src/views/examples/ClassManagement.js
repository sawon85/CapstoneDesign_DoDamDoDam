/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// import React from "react";
import React, { useContext, useState, useEffect } from 'react';
//import Layout from '../../components/Layout';
import ClassManagementStyled from './ClassManagement.style';
//import PageLayout from '../../layouts/PageLayout';
import styled from 'styled-components';
import AuthContext from '../../context/auth';
import ReactWordcloud from 'react-wordcloud';
import service from '../../service';
// reactstrap components

// core components
import MainNavbar from "components/Navbars/MainNavbar.js";
import UserFooter from "components/Footers/UserFooter.js";
// index page sections
import SampleHero from "../IndexSections/SampleHero";
import { Row } from "reactstrap";

const ClassManagement = (props) => {
  // componentDidMount() {
  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  //   this.refs.main.scrollTop = 0;
  // }

  const { positiveItems, negativeItems, checkItems } = props;
  const auth = useContext(AuthContext);
  let wordList = [{ text: '', value: '' }];

  //console.log(auth?.userMe);

  const [words, setWords] = useState([]);
  const getAllWords = async () => {
    const { data: AllWords } = await service.getWords(
      window.localStorage.getItem('id')
    );
    AllWords.map((word) => {
      wordList.push({ text: word.word, value: word.frequency });
    });
    setWords(words.concat(wordList));
  };
  useEffect(() => {
    getAllWords();
    console.log(words);
  }, []);

  return (
    <>
      <MainNavbar />

      <SampleHero headerStyle={3} />
      {/* <PageLayout> */}
      <Wrapper>
        <ClassManagementStyled>
          <div className="left">
            <div className="left-top">
              <div className="box">
                <h2 className="title">반 전체 한눈에 보기</h2>
                <div className="row-thumbnails">
                  <span className="row-thumbnail-text">긍정</span>
                  {positiveItems &&
                    positiveItems.map((item, index) => {
                      return (
                        <img
                          key={index}
                          className="thumbnail"
                          src={item}
                          alt="썸네일"
                        />
                      );
                    })}
                </div>
                <div className="dash-line"></div>
                <div className="row-thumbnails">
                  <span className="row-thumbnail-text">부정</span>
                  {negativeItems &&
                    negativeItems.map((item, index) => {
                      return (
                        <img
                          key={index}
                          className="thumbnail"
                          src={item}
                          alt="썸네일"
                        />
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="left-bottom">
              <div className="box">
                <h2 className="title">선생님이 한번 더 확인해 주세요</h2>
                {checkItems &&
                  checkItems.map((item, index) => {
                    return (
                      <div key={index} className="double-check">
                        <img
                          className="thumbnail-large"
                          src={item.thumbnail}
                          alt="썸네일"
                        ></img>
                        <div className="child-info">
                          <h3 className="name">{item.name}</h3>
                          <span className="desc">{item.desc}</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="right">
            <div className="title">반의 관심사</div>

            <div className="word-cloud ">
              <ReactWordcloud words={words} />
            </div>
          </div>
        </ClassManagementStyled>
      </Wrapper>
    {/* </PageLayout> */}
      {/* <Row>
        <div class="col-lg-5">1</div>
        <div class="col-lg-5">
          <Row>
            <div class="col-lg-12">2</div>
            <div class="col-lg-12">3</div>
          </Row>
        </div>
      </Row> */}

      <UserFooter />
    </>
  );
};
ClassManagement.defaultProps = {
  positiveItems: [
    'http://placehold.it/80x80',
    'http://placehold.it/80x80',
    'http://placehold.it/80x80',
    'http://placehold.it/80x80',
  ],
  negativeItems: [
    'http://placehold.it/80x80',
    'http://placehold.it/80x80',
    'http://placehold.it/80x80',
    'http://placehold.it/80x80',
  ],
  checkItems: [
    {
      name: '7번 하담비',
      desc: '최근 부정적 일기가 증가했어요!',
      thumbnail: 'http://placehold.it/100x100',
    },
    {
      name: '4번 이백기',
      desc: '최근 부정적 일기가 증가했어요!',
      thumbnail: 'http://placehold.it/100x100',
    },
  ],
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export default ClassManagement;
