/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import {
  cleanup,
  render,
  screen,
  userEvent,
} from 'spec/helpers/testing-library';
import Option from 'src/explore/components/controls/DndColumnSelectControl/Option';

describe('Option', () => {
  beforeAll(() => {
    jest.setTimeout(30000);
  });

  afterEach(async () => {
    cleanup();
    await new Promise(resolve => setTimeout(resolve, 0));
  });

  test('renders with default props', async () => {
    const { container, unmount } = render(
      <Option index={1} clickClose={jest.fn()}>
        Option
      </Option>,
    );
    expect(container).toBeInTheDocument();
    expect(
      await screen.findByRole('img', { name: 'close' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('img', { name: 'right' }),
    ).not.toBeInTheDocument();
    unmount();
  });

  test('renders with caret', async () => {
    const { unmount } = render(
      <Option index={1} clickClose={jest.fn()} withCaret>
        Option
      </Option>,
    );
    expect(
      await screen.findByRole('img', { name: 'close' }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('img', { name: 'right' }),
    ).toBeInTheDocument();
    unmount();
  });

  test('renders with extra triangle', async () => {
    const { unmount } = render(
      <Option index={1} clickClose={jest.fn()} isExtra>
        Option
      </Option>,
    );
    expect(
      await screen.findByRole('button', { name: 'Show info tooltip' }),
    ).toBeInTheDocument();
    unmount();
  });

  test('triggers onClose', async () => {
    const clickClose = jest.fn();
    const { unmount } = render(
      <Option index={1} clickClose={clickClose}>
        Option
      </Option>,
    );
    userEvent.click(await screen.findByRole('img', { name: 'close' }));
    expect(clickClose).toHaveBeenCalled();
    unmount();
  });
});
