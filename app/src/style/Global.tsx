import { Global, css } from '@emotion/react'

export function GlobalStyle() {
  return (
    <Global
      styles={css`
        * {
          box-sizing: border-box;
          word-wrap: break-word;
        }

        html,
        body,
        div#__next {
          height: 100%;
        }

        .keen-slider {
          height: 100%;
        }

        .react-date-picker,
        .react-date-picker *,
        .react-date-picker *:before,
        .react-date-picker *:after {
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
        }
        .react-date-picker--disabled {
          background-color: var(--chakra-colors-whiteAlpha-200);
          backdrop-filter: blur(5px);
          color: var(--chakra-colors-gray-800);
        }
        .react-date-picker__wrapper {
          position: relative;
          border-radius: 9999px;
          height: 50px;
          padding: 0 10px;
          background: var(--chakra-colors-gray-100);
          border: none;

          display: flex;
          flex-grow: 1;
          flex-shrink: 0;

          min-width: 160px;
        }
        .react-date-picker__inputGroup {
          min-width: calc((4px * 3) + 4.32em + 0.434em);
          flex-grow: 1;
          padding: 0 2px;
          box-sizing: content-box;
        }
        .react-date-picker__inputGroup__divider {
          padding: 1px 0;
          white-space: pre;
        }
        .react-date-picker__inputGroup__input {
          min-width: 0.54em;
          height: 100%;
          position: relative;
          padding: 0 1px;
          border: 0;
          background: none;
          font: inherit;
          font-weight: bold;
          box-sizing: content-box;
          -moz-appearance: textfield;
          &:invalid {
            background: rgba(255, 0, 0, 0.1);
          }
        }
        .react-date-picker__inputGroup__input::-webkit-outer-spin-button,
        .react-date-picker__inputGroup__input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .react-date-picker__inputGroup__leadingZero {
          font-weight: bold;
        }

        .react-date-picker__inputGroup__input--hasLeadingZero {
          margin-left: -0.54em;
          padding-left: calc(1px + 0.54em);
          font-weight: bold;
        }
        .react-date-picker__button {
          border: 0;
          background: transparent;
          padding: 4px 6px;
          color: currentColor;

          &:enabled {
            cursor: pointer;
          }
          &:disabled {
            .react-date-picker__button__icon {
              stroke: #6d6d6d;
            }
          }
          svg {
            display: inherit;
          }
        }

        .react-date-picker__clear-button__icon {
          color: red;
          background: red;
          svg > * {
            fill: red !important;
            stroke: red !important;
          }
        }

        .react-date-picker__button:enabled:hover .react-date-picker__button__icon,
        .react-date-picker__button:enabled:focus .react-date-picker__button__icon {
          stroke: #0078d7;
        }
        .react-date-picker__calendar {
          width: 350px;
          max-width: 100vw;
          position: absolute;
          top: 100%;
          left: 0;
          z-index: 1;
          .react-calendar {
            border-width: thin;
          }
        }
        .react-date-picker__calendar--closed {
          display: none;
        }

        // Calendar

        .react-calendar {
          width: 350px;
          max-width: 100%;
          background: var(--chakra-colors-whiteAlpha-700);
          backdrop-filter: blur(10px);
          border: 1px solid #a0a096;
          font-family: Arial, Helvetica, sans-serif;
          line-height: 1.125em;
          button {
            margin: 0;
            border: 0;
            outline: none;
            &:enabled {
              &:hover {
                cursor: pointer;
              }
            }
          }
        }

        .react-calendar {
          border-radius: 4px;
          overflow: hidden;
          margin-top: 8px;
          border: none;
          box-shadow: 0px 8px 14px 0px rgba(50, 50, 50, 0.61);
        }

        .react-calendar--doubleView {
          width: 700px;
          .react-calendar__viewContainer {
            display: flex;
            margin: -0.5em;
            & > * {
              width: 50%;
              margin: 0.5em;
            }
          }
        }
        .react-calendar,
        .react-calendar *,
        .react-calendar *:before,
        .react-calendar *:after {
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
        }
        .react-calendar__navigation {
          display: flex;
          height: 44px;
          margin-bottom: 1em;
          button {
            min-width: 44px;
            background: none;
            font-weight: bold;
            &:disabled {
              opacity: 0.2;
              cursor: default;
            }
          }
        }
        .react-calendar__navigation button:enabled:hover,
        .react-calendar__navigation button:enabled:focus {
          background-color: var(--chakra-colors-whiteAlpha-700);
        }
        .react-calendar__month-view__weekdays {
          text-align: center;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 0.75em;
        }
        .react-calendar__month-view__weekdays__weekday {
          padding: 0.5em;
        }
        .react-calendar__month-view__weekNumbers {
          .react-calendar__tile {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.75em;
            font-weight: bold;
          }
        }
        .react-calendar__month-view__days__day--weekend {
          color: rgb(214, 60, 94);
        }
        .react-calendar__month-view__days__day--neighboringMonth {
          color: var(--chakra-colors-blackAlpha-500);
        }
        .react-calendar__year-view .react-calendar__tile,
        .react-calendar__decade-view .react-calendar__tile,
        .react-calendar__century-view .react-calendar__tile {
          padding: 2em 0.5em;
        }
        .react-calendar__tile {
          max-width: 100%;
          padding: 10px 6.6667px;
          background: none;
          text-align: center;
          line-height: 16px;
          &:disabled {
            background-color: var(--chakra-colors-blackAlpha-100);
            color: var(--chakra-colors-blackAlpha-500);
            cursor: default;
          }
        }
        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus {
          background-color: var(--chakra-colors-whiteAlpha-700);
        }
        .react-calendar__tile--now {
          background: #ffff76;
        }
        .react-calendar__tile--now:enabled:hover,
        .react-calendar__tile--now:enabled:focus {
          background: var(--chakra-colors-whiteAlpha-700);
        }
        .react-calendar__tile--hasActive {
          background: #76bbff;
        }
        .react-calendar__tile--hasActive:enabled:hover,
        .react-calendar__tile--hasActive:enabled:focus {
          background: #a9d4ff;
        }
        .react-calendar__tile--active {
          background: rgb(214, 60, 94);
          color: white;
        }
        .react-calendar__tile--active:enabled:hover,
        .react-calendar__tile--active:enabled:focus {
          background: rgba(214, 60, 94, 0.8);
        }
        .react-calendar--selectRange {
          .react-calendar__tile--hover {
            background-color: #e6e6e6;
          }
        }
      `}
    />
  )
}
