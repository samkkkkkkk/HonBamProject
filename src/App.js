import React, { useContext, useEffect } from 'react';
import './App.css';
import { Modify } from './Component/User/Modify';
import AuthContext, { AuthContextProvider } from './util/AuthContext';
import { MyPage } from './Component/User/MyPage';
import { Login } from './Component/User/Login';
import { Join } from './Component/User/Join';
import SnsBoard from './Component/Board/SnsBoard';
import MyDetail from './Component/Board/MyDetail';
import UserDetail from './Component/Board/UserDetail';
import UserDetail2 from './Component/Board/UserDetail2';
import UserDetail3 from './Component/Board/UserDetail3';
import UserDetail4 from './Component/Board/UserDetail4';
import Setting from './Component/Board/Setting';

import { Chat } from './Component/Chat/Chat';
import { ChatMain } from './Component/Chat/ChatMain';
import { AiChat } from './Component/Chat/AiChat';
import { ChatApp } from './Component/Chat/vsChat/src/ChatApp';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from 'react-router-dom';
import Comment from './Component/Board/Comment';
import KakaoLoginHandler from './Component/User/KakaoLoginHandler';
import NaverLoginHandler from './Component/User/NaverLoginHandler';
import SearchPage from './Component/SearchPage/SearchPage';
import Main from './Component/mainpage/Main';
import { Navbar } from './Component/Navbar/Navbar';
import Recipe from './Component/Recipe/Recipe';
import AddBoard from './Component/Board/AddBoard';
import { Pay } from './Component/User/Pay';
import InquiryCreate from './Component/Inquiry/create/InquiryCreate';
import InquiryDetail from './Component/Inquiry/detail/InquiryDetail';
import Inquiry from './Component/Inquiry/list/Inquiry';
import InquiryModify from './Component/Inquiry/modify/InquiryModify';
import { MapContainer } from './Component/SearchPlace/MapContainer';
import { SearchPlace } from './Component/SearchPlace/SearchPlace';
import { NAVER_MAP_URL } from './util/naver-config';
import NaverSearch from './Component/Map/NaverSearch';
import { PaymentCheckoutPage } from './Component/User/TossPay';
import SubscriptionItems from './Component/Payment/SubscriptionItem';
import SubscriptionPage from './Component/Payment/SubscriptionPage';
import SubscriptionCheckout from './Component/Payment/SubscriptionCheckout';
import { CheckoutPage } from './Component/Toss/Checkout';
import { SuccessPage } from './Component/Toss/Success';
import { FailPage } from './Component/Toss/Fail';
import LoginTest from './Component/LoginTest';
import JoinTest from './Component/JoinTest';
import ProfileEdit from './Component/User/ProfileEdit';
import MapTest from './Component/SearchPlace/MapTest';
import { UserContextProvider } from './util/UserContext';

// import ProfileEdit from './Component/ProfileEdit';
// import Comment from './Component/Comment';
function ProtectedRoute({ element }) {
  const { isLoggedIn, userName, onLogout } = useContext(AuthContext);

  useEffect(() => {
    // 유저가 로그인하고 프리미엄 구독 상태인지 확인
    if (
      isLoggedIn &&
      userName &&
      localStorage.getItem('USER_PAY') !== 'PREMIUM'
    ) {
      window.alert('프리미엄 회원만 이용 가능합니다!');
    }
  }, [isLoggedIn, userName]);

  if (!isLoggedIn) {
    alert('로그인이 필요한 서비스입니다!');
    return <Navigate to='/login' />;
  }

  // 유저가 로그인하고 프리미엄 구독 상태인지 확인
  if (
    isLoggedIn &&
    userName &&
    localStorage.getItem('USER_PAY') === 'PREMIUM'
  ) {
    return element;
  } else {
    // 프리미엄 구독이 없거나 로그인하지 않은 경우 로그인 페이지로 리다이렉트
    return <Navigate to='/Pay' />;
  }
}
function App() {
  return (
    <>
      <AuthContextProvider>
        <UserContextProvider>
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route
            path='/naverSearchHotPlace'
            element={<ProtectedRoute element={<NaverSearch />} />}
          />

          <Route path='/mypage' element={<MyPage />} />
          <Route path='/Pay' element={<SubscriptionItems />} />
          <Route
            path='/subscriptionCheckout'
            element={<SubscriptionCheckout />}
          />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/success' element={<SuccessPage />} />
          <Route path='/fail' element={<FailPage />} />

          {/* <Route
            path='/Modify'
            element={<ProtectedRoute element={<Modify />} />}
          /> */}

          <Route path='/modify' element={<ProfileEdit />} />

          <Route path='/login' element={<LoginTest />} />
          <Route path='/Join' element={<JoinTest />} />
          <Route path='/board' element={<SnsBoard />} />
          <Route path='/addboard' element={<AddBoard />} />
          <Route path='/UserDetail' element={<UserDetail />} />
          <Route path='/MapContainer' element={<MapContainer />} />
          <Route path='/searchPlace' element={<MapTest />} />
          <Route path='/Setting' element={<Setting />} />
          <Route path='/comment/:posId' element={<Comment />} />
          <Route path='/ProfileEdit' element={<ProfileEdit />} />
          <Route path='/mydetail' element={<MyDetail />} />
          <Route path='/addboard' element={<AddBoard />} />
          <Route
            path='/oauth/redirected/HonBam'
            element={<KakaoLoginHandler />}
          />
          <Route
            path='/oauth/redirected/Naver'
            element={<NaverLoginHandler />}
          />
          {/* <Route
            path='/Chat'
            element={<Chat />}
          ></Route> */}
          <Route path='/Chat' element={<ProtectedRoute element={<Chat />} />} />
          <Route path='/ChatMain' element={<ChatMain />}></Route>
          <Route path='/AiChat' element={<AiChat />}></Route>
          <Route path='/ChatApp' element={<ChatApp />}></Route>
          {/* <Route
            path='/naverSearch'
            element={<NaverSearch />}
          /> */}
          <Route path='/freeboard' element={<Inquiry />}></Route>
          <Route path='/freeboard/:id' element={<InquiryDetail />}></Route>
          <Route path='/freeboard/create' element={<InquiryCreate />}></Route>
          <Route
            path='/freeboard/modify/:id'
            element={<InquiryModify />}
          ></Route>
          <Route path='/' element={<Main />}></Route>
          <Route path='/search' element={<SearchPage />}></Route>
          {/* <Route
            path='/recipe'
            element={<Recipe />}
          ></Route> */}

          <Route
            path='/recipe'
            element={<ProtectedRoute element={<Recipe />} />}
          />
        </Routes>
        </UserContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
