import _ from 'underscore';
import React, {forwardRef} from 'react';
import {TouchableOpacity} from 'react-native';
import * as pressableWithSecondaryInteractionPropTypes from './pressableWithSecondaryInteractionPropTypes';
import Text from '../Text';
import HapticFeedback from '../../libs/HapticFeedback';

/**
 * This is a special Pressable that calls onSecondaryInteraction when LongPressed.
 *
 * @param {Object} props
 * @returns {React.Component}
 */
const PressableWithSecondaryInteraction = (props) => {
    // Use Text node for inline mode to prevent content overflow.
    const Node = props.inline ? Text : TouchableOpacity;
    return (
        <Node
            ref={props.forwardedRef}
            onPress={props.onPress}
            onLongPress={(e) => {
                if (!props.onSecondaryInteraction) {
                    return;
                }
                e.preventDefault();
                HapticFeedback.longPress();
                props.onSecondaryInteraction(e);
            }}
            onPressIn={props.onPressIn}
            onPressOut={props.onPressOut}
            activeOpacity={props.activeOpacity}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {..._.omit(props, 'onLongPress')}
        >
            {props.children}
        </Node>
    );
};

PressableWithSecondaryInteraction.propTypes = pressableWithSecondaryInteractionPropTypes.propTypes;
PressableWithSecondaryInteraction.defaultProps = pressableWithSecondaryInteractionPropTypes.defaultProps;
PressableWithSecondaryInteraction.displayName = 'PressableWithSecondaryInteraction';

export default forwardRef((props, ref) => (
    <PressableWithSecondaryInteraction
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        forwardedRef={ref}
    />
));
