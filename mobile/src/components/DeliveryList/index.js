import React, { useEffect, useState, useCallback } from 'react';
import { Text, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

import DeliveryCard from '../DeliveryCard';

import { Container, Loading, Empty, EmptyLabel, List } from './styles';

const DeliveryList = ({ option, navigation }) => {
  const id = useSelector((state) => state.user.profile.id);

  const [deliveries, setDeliveries] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  function formatDate(orders) {
    return orders.map((delivery) => ({
      ...delivery,
      formattedDate: format(parseISO(delivery.createdAt), 'dd/MM/yyyy'),
    }));
  }

  const loadDeliveries = useCallback(async () => {
    setDeliveries([]);
    setLoading(true);

    try {
      let url = `deliverymen/${id}/deliveries`;
      if (option === 'delivered') {
        url += '?type=delivered';
      } else {
        url += '?type=notDelivered';
      }

      const { data } = await api.get(url);
      setDeliveries(formatDate(data));
    } catch (err) {
      Alert.alert(
        'Falha na requisição',
        'Não foi possível buscar as entregas, por favor tente mais tarde.',
      );
    }
    setLoading(false);
  }, [id, option]);

  useEffect(() => {
    loadDeliveries();
  }, [loadDeliveries]);

  const refreshDeliveries = useCallback(async () => {
    setDeliveries([]);
    setRefreshing(true);
    setPage(1);

    try {
      let url = `deliverymen/${id}/deliveries`;
      if (option === 'delivered') {
        url += '?type=delivered';
      } else {
        url += '?type=notDelivered';
      }

      const { data } = await api.get(url);
      setDeliveries(formatDate(data));

      if ((await AsyncStorage.getItem('@deliveries')) != null) {
        await AsyncStorage.removeItem('deliveries');
      }

      const jsonValue = JSON.stringify(formatDate(data));
      await AsyncStorage.setItem('@deliveries', jsonValue);
    } catch (err) {
      // Alert.alert(
      //   'Falha na requisição',
      //   'Não foi possível buscar as entregas, por favor tente mais tarde.',
      // );
      const jsonValue = await AsyncStorage.getItem('@deliveries');
      const data = JSON.parse(jsonValue);
      setDeliveries(data);
    }

    setRefreshing(false);
  }, [id, option]);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <List
            data={deliveries}
            keyExtractor={(delivery, index) => String(index)}
            renderItem={({ item }) => (
              <DeliveryCard navigation={navigation} delivery={item} />
            )}
            refreshing={refreshing}
            onRefresh={refreshDeliveries}
            // onEndReached={moreDeliveries}
            // onEndReachedThreshold={0.5}
            ListEmptyComponent={() => (
              <Empty>
                {!refreshing && <EmptyLabel>Não há encomendas aqui</EmptyLabel>}
              </Empty>
            )}
          />
        </>
      )}
    </Container>
  );
};

DeliveryList.defaultProps = {
  option: 'pending',
};

DeliveryList.propTypes = {
  option: PropTypes.string,
  navigation: PropTypes.instanceOf(Object).isRequired,
};

export default DeliveryList;
