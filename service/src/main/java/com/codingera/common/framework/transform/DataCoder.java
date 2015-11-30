package com.codingera.common.framework.transform;

public interface DataCoder<T,E> {

	public E encode(T src);
	
	public T decode(E src);
}
