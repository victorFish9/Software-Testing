import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import TodoInput from './components/TodoInput';

test('renders without crashing', () => {
    const div = document.createElement('div');
    render(<App />, div);
});

