import { ReactNode } from 'react';

interface AppProps {
  children?: ReactNode;
}

const App = ({ children }: AppProps) => {
  return <div className="app">{children}</div>;
};

export default App;
