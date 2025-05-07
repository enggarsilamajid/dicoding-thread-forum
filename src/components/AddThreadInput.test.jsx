/**
 * test scenario for AddThreadInput component
 *
 * - AddThreadInput component
 *  - should handle title, body, and category typing correctly
 *  - should call addThread function with correct arguments when the button is clicked
 *  - should reset inputs after submitting the form
 */

import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { AddThreadInput } from './AddThreadInput';

expect.extend(matchers);

describe('AddThreadInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle title, body, and category typing correctly', async () => {
    // arrange
    render(<AddThreadInput addThread={() => {}} />);

    const titleInput = screen.getByPlaceholderText('Judul Diskusi');
    const bodyInput = screen.getByPlaceholderText('Tulis isi diskusi di sini ...');
    const categoryInput = screen.getByPlaceholderText('Kategori (opsional)');

    // action
    await userEvent.type(titleInput, 'Diskusi React');
    await userEvent.type(bodyInput, 'React Redux sangat menantang dan menyenangkan untuk dipelajari.');
    await userEvent.type(categoryInput, 'React');

    // assert
    expect(titleInput).toHaveValue('Diskusi React');
    expect(bodyInput).toHaveValue('React Redux sangat menantang dan menyenangkan untuk dipelajari.');
    expect(categoryInput).toHaveValue('React');
  });

  it('should call addThread function with correct arguments when the button is clicked', async () => {
    // arrange
    const addThreadMock = vi.fn();
    render(<AddThreadInput addThread={addThreadMock} />);

    const titleInput = screen.getByPlaceholderText('Judul Diskusi');
    const bodyInput = screen.getByPlaceholderText('Tulis isi diskusi di sini ...');
    const categoryInput = screen.getByPlaceholderText('Kategori (opsional)');
    const submitButton = screen.getByText('Bagikan');

    // action
    await userEvent.type(titleInput, 'Diskusi tentang website');
    await userEvent.type(bodyInput, 'Pengembang Website dibagi menjadi FrontEnd, BackEnd, dan FullStack.');
    await userEvent.type(categoryInput, 'Website');

    await userEvent.click(submitButton);

    // assert
    expect(addThreadMock).toHaveBeenCalledWith({
      title: 'Diskusi tentang website',
      body: 'Pengembang Website dibagi menjadi FrontEnd, BackEnd, dan FullStack.',
      category: 'Website',
    });
  });

  it('should reset inputs after submitting the form', async () => {
    // arrange
    const addThreadMock = vi.fn();
    render(<AddThreadInput addThread={addThreadMock} />);

    const titleInput = screen.getByPlaceholderText('Judul Diskusi');
    const bodyInput = screen.getByPlaceholderText('Tulis isi diskusi di sini ...');
    const categoryInput = screen.getByPlaceholderText('Kategori (opsional)');
    const submitButton = screen.getByText('Bagikan');

    // action
    await userEvent.type(titleInput, 'Diskusi FrontEnd');
    await userEvent.type(bodyInput, 'React merupakan hal menarik untuk FrontEnd.');
    await userEvent.type(categoryInput, 'FrontEnd');

    await userEvent.click(submitButton);

    // assert
    expect(titleInput).toHaveValue('');
    expect(bodyInput).toHaveValue('');
    expect(categoryInput).toHaveValue('');
  }, 10000);
});