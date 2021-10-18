import React from 'react';
import { SvgXml } from 'react-native-svg';

function QRCodeIcon(props: { width: number; height: number }) {
  const xml = `<svg
  xmlns="http://www.w3.org/2000/svg"
  width=${props.width}
  height=${props.height}
  data-name="Layer 1"
  viewBox="0 0 970 796"
>
  <circle cx="917" cy="200" r="53" fill="#ccc" opacity="0.3"></circle>
  <circle cx="917" cy="200" r="30" fill="#5d5fef"></circle>
  <circle cx="882" cy="53" r="53" fill="#ccc" opacity="0.3"></circle>
  <circle cx="882" cy="53" r="30" fill="#5d5fef"></circle>
  <circle cx="53" cy="253" r="53" fill="#ccc" opacity="0.3"></circle>
  <circle cx="53" cy="253" r="30" fill="#5d5fef"></circle>
  <circle cx="100" cy="665" r="53" fill="#ccc" opacity="0.3"></circle>
  <circle cx="100" cy="665" r="30" fill="#5d5fef"></circle>
  <circle cx="172" cy="100" r="53" fill="#ccc" opacity="0.3"></circle>
  <circle cx="172" cy="100" r="30" fill="#5d5fef"></circle>
  <path
    fill="#3f3d56"
    d="M983 483c0 178.34-127.91 326.81-297 358.67-.66.13-1.33.25-2 .37q-15.765 2.895-32 4.39c-.67.07-1.33.13-2 .18q-15.81 1.38-32 1.39c-.67 0-1.33 0-2-.01q-16.17-.075-32-1.56c-.67-.05-1.33-.12-2-.19q-16.215-1.575-32-4.57c-.67-.12-1.34-.25-2-.38C379.9 808.64 253 660.64 253 483c0-201.58 163.42-365 365-365s365 163.42 365 365z"
    transform="translate(-115 -52)"
  ></path>
  <path fill="#5d5fef" d="M570 274.5H572V571H570z"></path>
  <path fill="#5d5fef" d="M570 147.402H572V234.87399999999997H570z"></path>
  <path fill="#5d5fef" d="M433 138.275H435V571H433z"></path>
  <path fill="#5d5fef" d="M467 100H469V197.457H467z"></path>
  <path fill="#5d5fef" d="M467 244H469V540.6379999999999H467z"></path>
  <path
    fill="#5d5fef"
    d="M584 638.75v207.68c-.67-.05-1.33-.12-2-.19V638.75z"
    transform="translate(-115 -52)"
  ></path>
  <path fill="#5d5fef" d="M501 68H503V343.347H501z"></path>
  <path
    fill="#5d5fef"
    d="M618 433.52V848c-.67 0-1.33 0-2-.01V433.52z"
    transform="translate(-115 -52)"
  ></path>
  <path fill="#5d5fef" d="M535 100H537V482H535z"></path>
  <path fill="#5d5fef" d="M535 523H537V737.173H535z"></path>
  <path
    fill="#5d5fef"
    d="M652 834.53v11.9c-.67.07-1.33.13-2 .18v-12.08zM686 675v166.67c-.66.13-1.33.25-2 .37V675zM550 675v166.67c-.67-.12-1.34-.25-2-.38V675z"
    transform="translate(-115 -52)"
  ></path>
  <path fill="#5d5fef" d="M399 177H401V239.41H399z"></path>
  <path fill="#5d5fef" d="M399 286.275H401V571H399z"></path>
  <path fill="#5d5fef" d="M365 200H367V571H365z"></path>
  <path fill="#5d5fef" d="M331 230H333V350.905H331z"></path>
  <path fill="#5d5fef" d="M331 390.968H333V571H331z"></path>
  <path fill="#5d5fef" d="M297 262H299V463.536H297z"></path>
  <path fill="#5d5fef" d="M297 501H299V571H297z"></path>
  <path fill="#5d5fef" d="M263 292H265V359.599H263z"></path>
  <path fill="#5d5fef" d="M263 403.819H265V571H263z"></path>
  <path fill="#5d5fef" d="M229 308H231V571H229z"></path>
  <path fill="#5d5fef" d="M195 380H197V466.937H195z"></path>
  <path fill="#5d5fef" d="M195 506.622H197V571H195z"></path>
  <path fill="#5d5fef" d="M590.375 177H591.412V554H590.375z"></path>
  <path fill="#5d5fef" d="M637 200H639V259.44100000000003H637z"></path>
  <path fill="#5d5fef" d="M637 299.126H639V571H637z"></path>
  <path fill="#5d5fef" d="M671 257H673V292H671z"></path>
  <path fill="#5d5fef" d="M671 331.252H673V505.11H671z"></path>
  <path fill="#5d5fef" d="M671 540.638H673V571H671z"></path>
  <path fill="#5d5fef" d="M705 262H707V571H705z"></path>
  <path fill="#5d5fef" d="M739 292H741V390.968H739z"></path>
  <path fill="#5d5fef" d="M739 428.386H741V571H739z"></path>
  <path fill="#5d5fef" d="M773 308H775V571H773z"></path>
  <path
    fill="#5d5fef"
    d="M549 676a10 10 0 1110-10 10.012 10.012 0 01-10 10zm0-18a8 8 0 108 8 8.01 8.01 0 00-8-8zM583 624a10 10 0 1110-10 10.012 10.012 0 01-10 10zm0-18a8 8 0 108 8 8.01 8.01 0 00-8-8zM686 676a10 10 0 1110-10 10.012 10.012 0 01-10 10zm0-18a8 8 0 108 8 8.01 8.01 0 00-8-8zM651 801a10 10 0 1010 10 10.016 10.016 0 00-10-10zm0 18a8 8 0 118-8 8.01 8.01 0 01-8 8zM651 563a10 10 0 1110-10 10.012 10.012 0 01-10 10zm0-18a8 8 0 108 8 8.01 8.01 0 00-8-8zM617 424a10 10 0 1110-10 10.011 10.011 0 01-10 10zM685 315a10 10 0 1110-10 10.011 10.011 0 01-10 10zm0-18a8 8 0 108 8 8.01 8.01 0 00-8-8zM447 433a10 10 0 1110-10 10.011 10.011 0 01-10 10zm0-18a8 8 0 108 8 8.01 8.01 0 00-8-8zM379 442a10 10 0 1110-10 10.011 10.011 0 01-10 10zm0-18a8 8 0 108 8 8.01 8.01 0 00-8-8zM413 544a10 10 0 1110-10 10.011 10.011 0 01-10 10zM686 200a10 10 0 1110-10 10.011 10.011 0 01-10 10zm0-18a8 8 0 108 8 8.01 8.01 0 00-8-8zM515 324a10 10 0 1110-10 10.011 10.011 0 01-10 10zm0-18a8 8 0 108 8 8.01 8.01 0 00-8-8zM481 253a10 10 0 1110-10 10.011 10.011 0 01-10 10zm0-18a8 8 0 108 8 8.01 8.01 0 00-8-8zM311 549a10 10 0 1110-10 10.012 10.012 0 01-10 10zm0-18a8 8 0 108 8 8.01 8.01 0 00-8-8z"
    transform="translate(-115 -52)"
  ></path>
  <path fill="#5d5fef" d="M804 380H806V466.937H804z"></path>
  <path fill="#5d5fef" d="M804 506.622H806V571H804z"></path>
  <path
    fill="#5d5fef"
    d="M920 549a10 10 0 1110-10 10.012 10.012 0 01-10 10zm0-18a8 8 0 108 8 8.01 8.01 0 00-8-8zM855 470a10 10 0 1110-10 10.011 10.011 0 01-10 10zm0-18a8 8 0 108 8 8.01 8.01 0 00-8-8zM787 585a10 10 0 1110-10 10.012 10.012 0 01-10 10zm0-18a8 8 0 108 8 8.01 8.01 0 00-8-8zM583 283a10 10 0 1110-10 10.011 10.011 0 01-10 10zM787 374a10 10 0 1110-10 10.011 10.011 0 01-10 10zm0-18a8 8 0 108 8 8.01 8.01 0 00-8-8zM855 345a10 10 0 1110-10 10.011 10.011 0 01-10 10zM753 340a10 10 0 1110-10 10.011 10.011 0 01-10 10z"
    transform="translate(-115 -52)"
  ></path>
  <path
    fill="#2f2e41"
    d="M918 288.017L738.983 285 739.017 283 916 285.983 916 200 918 200 918 288.017z"
  ></path>
  <path
    fill="#2f2e41"
    d="M638.923 278.386L637.077 277.614 731.334 52 882 52 882 54 732.666 54 638.923 278.386z"
  ></path>
  <path
    fill="#2f2e41"
    d="M503 363L52 363 52 254 54 254 54 361 503 361 503 363z"
  ></path>
  <path
    fill="#2f2e41"
    d="M468 222L169 222 169 100 171 100 171 220 468 220 468 222z"
  ></path>
  <path
    fill="#2f2e41"
    d="M299 666L100 666 100 664 297 664 297 481 299 481 299 666z"
  ></path>
</svg>`;

  return <SvgXml xml={xml} />;
}

export default QRCodeIcon;
