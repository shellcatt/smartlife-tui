import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
			<blessed-text
				left='center'
				width="60%"
				style={{
					bg: "black",
					fg: "white"
				}}
				border={{
					type: "line",
				}}
				shadow
				content={this.state.error?.toString()}
			/>
			<blessed-text
				top="center"
				height="50%"
				width="100%"
				left='center'
				style={{
					bg: "black",
					fg: "white"
				}}
				border={{
					type: "line",
				}}
				shadow
				content={this.state.errorInfo?.componentStack}
			/>
		</>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
