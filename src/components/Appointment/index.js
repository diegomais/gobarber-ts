import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { Container, Left, Avatar, Info, Name, Time, Canceled } from './styles';

export default function Appointment({ data, onCancel }) {
  const dateFormated = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date());
  }, [data.date]);

  return (
    <Container past={data.past}>
      <Left>
        <Avatar
          source={{
            uri: data.provider.avatar
              ? data.provider.avatar.url
              : `https://api.adorable.io/avatar/50/${data.provider.name}.png`,
          }}
        />
        <Info>
          <Name>{data.provider.name}</Name>
          <Time>{dateFormated}</Time>
          {data.canceled_at && <Canceled>Cancelled</Canceled>}
        </Info>
      </Left>
      {data.cancellable && !data.canceled_at && (
        <TouchableOpacity onPress={onCancel}>
          <Icon name="event-busy" size={20} color="#f64c75" />
        </TouchableOpacity>
      )}
    </Container>
  );
}

Appointment.propTypes = {
  data: PropTypes.shape({
    date: PropTypes.string.isRequired,
    canceled_at: PropTypes.string,
    past: PropTypes.bool,
    cancellable: PropTypes.bool,
    provider: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
};
