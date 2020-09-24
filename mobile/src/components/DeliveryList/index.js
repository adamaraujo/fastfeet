import React, { useEffect, useState, useCallback } from 'react';
import { Text, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import api from '../../services/api';

import DeliveryCard from '../DeliveryCard';

import { Container, Loading, Empty, EmptyLabel, List } from './styles';

const DeliveryList = ({ option }) => {
  const id = useSelector((state) => state.user.profile.id);

  const [deliveries, setDeliveries] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

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
      setDeliveries(data);
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
      setDeliveries(data);
    } catch (err) {
      Alert.alert(
        'Falha na requisição',
        'Não foi possível buscar as entregas, por favor tente mais tarde.',
      );
    }
    setRefreshing(false);
  }, [id, option]);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          {deliveries.length > 0 ? (
            <>
              <List
                data={deliveries}
                keyExtractor={(delivery, index) => String(index)}
                renderItem={({ item }) => <DeliveryCard delivery={item} />}
                refreshing={refreshing}
                onRefresh={refreshDeliveries}
              />
            </>
          ) : (
            <Empty>
              <EmptyLabel>Não há encomendas aqui</EmptyLabel>
            </Empty>
          )}
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
};

export default DeliveryList;
