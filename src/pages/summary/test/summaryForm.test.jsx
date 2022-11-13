import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SummaryForm from '../summaryForm';

test('Initial conditions', () => {
  render(<SummaryForm />);
  const checkboxBtn = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });

  expect(checkboxBtn).not.toBeChecked();

  const confirmBtn = screen.getByRole('button', {
    name: /confirm order/i,
  });

  expect(confirmBtn).toBeDisabled();
});

test('checkbox enables button on first click and disables on second click', () => {
  render(<SummaryForm />);
  const checkboxBtn = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const confirmBtn = screen.getByRole('button', {
    name: /confirm order/i,
  });

  fireEvent.click(checkboxBtn);
  expect(confirmBtn).toBeEnabled();

  fireEvent.click(checkboxBtn);
  expect(confirmBtn).toBeDisabled();
});

test('Popover response to hover', async () => {
  render(<SummaryForm />);
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  const nullPopup = screen.queryByText(
    /No ice cream will actually be delivered/i
  );

  expect(nullPopup).not.toBeInTheDocument();

  userEvent.hover(termsAndConditions);
  const popover = screen.getByText(/No ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/No ice cream will actually be delivered/i)
  );
});
