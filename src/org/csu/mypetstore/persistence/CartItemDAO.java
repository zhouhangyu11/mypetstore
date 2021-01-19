package org.csu.mypetstore.persistence;


import org.csu.mypetstore.domain.Cart;
import org.csu.mypetstore.domain.CartItem;

import java.util.List;

public interface CartItemDAO {
    void insertCart(CartItem cartItem);

    void removeItemById(String itemId);

    List<CartItem> get();

    void update(String itemId,int quantity,float total);
}
