type Props = {
    children?: React.ReactNode;
  };
  
  const Container = ({ children }: Props) => {
    return <div className="container mx-auto px-5 max-w-6xl">{children}</div>;
  };
  
  export default Container;