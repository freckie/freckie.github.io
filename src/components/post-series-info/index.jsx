import React from 'react'
import { Link } from 'gatsby'

import './index.scss'

export const PostSeriesInfo = ({ series }) => {
  const tempLink = '/cloud/service_1'

  const rendering = () => {
    const items = []
    for(let i=0; i<series.length; i++) {
      items.push(
        <li key={i} className={series[i].current ? 'current' : '' }>
          <Link to={series[i].link}>{series[i].title}</Link>
        </li>)
    }

    return items
  }

  return (
    <div>
      <div className='post-series-info'>
        <h3>❗️&nbsp;이 포스트는 시리즈로 구성되었습니다.</h3>
        <ol>
          {rendering()}
        </ol>
      </div>
        <hr />
        &nbsp;
    </div>
  )
}