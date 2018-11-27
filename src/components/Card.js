import React from 'react'
import PropTypes from 'prop-types'

export const Card = (props) => (
    <div className={props.className}>
        <div className="card text-left">
        <div className="card-header">
            <b className="card-title" style={{cursor:'pointer'}} onClick={props.onClick}>{props.title}</b>
            <span aria-hidden="true" onClick={props.onDelete} className="close">&times;</span>
        </div>
        <div className="card-body" style={{cursor:'pointer'}} onClick={props.onClick}>
            {props.children}
        </div>
        </div>
    </div>
)
Card.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
}

export default Card
