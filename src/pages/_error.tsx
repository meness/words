import type { NextPage, NextPageContext } from 'next';
import Error, { type ErrorProps } from 'next/error';

const ErrorPage: NextPage<ErrorProps> = ({ statusCode }) => <Error statusCode={statusCode} />;

ErrorPage.getInitialProps = async (contextData: NextPageContext) => Error.getInitialProps(contextData);

export default ErrorPage;
