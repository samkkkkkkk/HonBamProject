import { useContext, useEffect } from 'react';
import '@/App.css';
import AuthContext, { AuthContextProvider } from '@/util/AuthContext';
import { MyPage } from '@/Component/User/MyPage';
import { Route, Routes, Navigate } from 'react-router-dom';
import KakaoLoginHandler from '@/Component/User/KakaoLoginHandler';
import SearchPage from '@/Component/SearchPage/SearchPage';
import Main from '@/Component/mainpage/Main';
import { Navbar } from '@/Component/Navbar/Navbar';
import Recipe from '@/Component/Recipe/Recipe';
import InquiryCreate from '@/Component/Inquiry/create/InquiryCreate';
import InquiryDetail from '@/Component/Inquiry/detail/InquiryDetail';
import Inquiry from '@/Component/Inquiry/list/Inquiry';
import InquiryModify from '@/Component/Inquiry/modify/InquiryModify';
import { MapContainer } from '@/Component/SearchPlace/MapContainer';
import SubscriptionItems from '@/Component/Payment/SubscriptionItem';
import SubscriptionCheckout from '@/Component/Payment/SubscriptionCheckout';
import { CheckoutPage } from '@/Component/Toss/Checkout';
import { SuccessPage } from '@/Component/Toss/Success';
import { FailPage } from '@/Component/Toss/Fail';
import Login from '@/Component/User/Login';
import Join from '@/Component/User/Join';
import ProfileEdit from '@/Component/User/ProfileEdit';
import MapTest from '@/Component/SearchPlace/MapTest';
import UserContext, { UserContextProvider } from '@/util/UserContext';
import OAuth2Success from './pages/OAuth2Success';
import OAuth2Failure from './pages/OAuth2Fail';
import DaumSearch from './Component/Map/DaumSearch';
import ChatApp from './Component/Chat/ChatApp';
import ChatContext, { ChatProvider } from './util/ChatContext';
import FeedPage from './pages/FeedPage';
import PostDetailPage from './Component/Feed/PostDetailPage';
import FeedTabs from './Component/Feed/FeedTabs';
import SnsProfilePage from './pages/SnsProfilePage';
function ProtectedRoute({ element }) {
  const { isLoggedIn } = useContext(AuthContext);
  const { userRole, userName } = useContext(UserContext);

  useEffect(() => {
    // 유저가 로그인하고 프리미엄 구독 상태인지 확인
    if (isLoggedIn && userName && userRole !== 'PREMIUM') {
      window.alert('프리미엄 회원만 이용 가능합니다!');
    }
  }, [isLoggedIn, userName]);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // 유저가 로그인하고 프리미엄 구독 상태인지 확인
  if (isLoggedIn && userName && userRole === 'PREMIUM') {
    return element;
  } else {
    // 프리미엄 구독이 없거나 로그인하지 않은 경우 로그인 페이지로 리다이렉트
    return <Navigate to="/Pay" />;
  }
}
function App() {
  return (
    <>
      <AuthContextProvider>
        <UserContextProvider>
          <ChatProvider>
            <div>
              <Navbar />
            </div>
            <Routes>
              <Route
                path="/naverSearchHotPlace"
                element={<ProtectedRoute element={<DaumSearch />} />}
              />

              <Route path="/mypage" element={<MyPage />} />
              <Route path="/Pay" element={<SubscriptionItems />} />
              <Route
                path="/subscriptionCheckout"
                element={<SubscriptionCheckout />}
              />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/fail" element={<FailPage />} />

              {/* <Route
            path='/Modify'
            element={<ProtectedRoute element={<Modify />} />}
          /> */}

              <Route path="/modify" element={<ProfileEdit />} />

              <Route path="/login" element={<Login />} />
              <Route path="/Join" element={<Join />} />
              <Route path="/MapContainer" element={<MapContainer />} />
              <Route path="/searchPlace" element={<MapTest />} />
              <Route path="/ProfileEdit" element={<ProfileEdit />} />
              <Route
                path="/oauth/redirected/HonBam"
                element={<KakaoLoginHandler />}
              />
              <Route path="/oauth2/success" element={<OAuth2Success />} />
              <Route path="/oauth2/failure" element={<OAuth2Failure />} />

              <Route path="/freeboard" element={<Inquiry />}></Route>
              <Route path="/freeboard/:id" element={<InquiryDetail />}></Route>
              <Route
                path="/freeboard/create"
                element={<InquiryCreate />}
              ></Route>
              <Route
                path="/freeboard/modify/:id"
                element={<InquiryModify />}
              ></Route>
              <Route path="/" element={<Main />}></Route>
              <Route path="/search" element={<SearchPage />}></Route>

              <Route
                path="/recipe"
                element={<ProtectedRoute element={<Recipe />} />}
              />

              {/* 채팅 라우트 */}
              {/* <Route
              path="/chat/*"
              element={<ProtectedRoute element={<ChatApp />} />}
            /> */}

              {/* 테스트 용도라면 보호 안 해도 됨 */}
              <Route path="/chat/*" element={<ChatApp />} />
              <Route path="/feed" element={<FeedTabs />} />
              <Route path="/sns/posts/:postId" element={<PostDetailPage />} />

              <Route
                path="/sns/profile/:authorId"
                element={<SnsProfilePage />}
              />
            </Routes>
          </ChatProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
