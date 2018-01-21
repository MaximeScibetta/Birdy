import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { AddBirdForm } from './common/AddBirdForm';

const AddBird = () => {
    return (
        <AddBirdForm />
    )
}

export default connect(({ routes }) => ({ routes }))(AddBird)