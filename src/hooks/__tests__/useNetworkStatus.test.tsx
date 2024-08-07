import NetInfo from '@react-native-community/netinfo';
import { act, renderHook } from '@testing-library/react-hooks';

import { useNetworkStatus } from '../useNetworkStatus';

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
}));

describe('useNetworkStatus', () => {
  it('should update isConnected when network status changes', () => {
    const mockAddEventListener = NetInfo.addEventListener as jest.Mock;
    const mockCallback = jest.fn();

    mockAddEventListener.mockImplementation(callback => {
      // @author Daniel Marques
      /** Explicação: Aqui é como se fosse a unsubscribe */
      mockCallback.mockImplementation(callback);
      return jest.fn();
    });

    const { result } = renderHook(() => useNetworkStatus());

    expect(result.current).toBe(true);

    act(() => {
      mockCallback({ isConnected: false });
    });

    expect(result.current).toBe(false);
  });
});
