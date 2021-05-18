import React, { forwardRef } from 'react';
import { Helmet } from 'react-helmet';

interface ICallerProps {
  children : any,
  title : string,
  className : string
}

const Page = React.forwardRef(({ className = '' , children,title = '', ...rest} : ICallerProps , ref :any) => {
  return (
    <div ref={ref} {...rest} >
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
});

export default Page;
