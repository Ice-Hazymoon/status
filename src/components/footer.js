import React from 'react';
import Link from './link';

const Footer = () => {
  return (
    <div id="footer">
      <div className="container">
        <p>基于 <Link to="https://uptimerobot.com/" text="UptimeRobot" /> 接口制作，检测频率 5 分钟</p>
        <p>&copy; Made by <Link to="https://github.com/yb/uptime-status" text="uptime-status" /></p>
      </div>
    </div>
  );
}

export default Footer;
