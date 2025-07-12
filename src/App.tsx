// LayoutExample.tsx
import styled from 'styled-components';
import { Peoples } from './pages/people/Peoples';

export function App() {
  return (
    <AppContainer>
      <TopNav>TopNav </TopNav>

      <MainWrapper>
        <SideNav>SideNav</SideNav>

        {/* esto seria como mi container de mi page */}
        <ContentArea>
          <HeroSection>
            <h1>Hero</h1>
          </HeroSection>

          <TableSection>
            <Peoples />
          </TableSection>
        </ContentArea>
      </MainWrapper>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  height: 100vh;
`;

// Barra superior (Topnav)
const TopNav = styled.div`
  height: 60px;
  background-color: #006eff;
  color: #fff;
  display: flex;
  align-items: center;
  padding-left: 1rem;
`;

const MainWrapper = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`;

const SideNav = styled.div`
  width: 200px;
  background-color: #dddddd;
  padding: 1rem;
  color: #444;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const HeroSection = styled.div`
  flex: 0 0 150px;
  width: 100%;
  background-color: #ffdddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const TableSection = styled.div`
  flex: 1;
  background-color: #fff;
  margin: 1rem;
  padding: 1rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;
