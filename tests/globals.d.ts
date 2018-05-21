import ExpectStatic = Chai.ExpectStatic;

declare let expect: ExpectStatic;
declare interface Map<K,V> {
    map<NK, NV>(mapper: (value?, key?, map?: Map<any, any>) => {key: NK, value:NV}) : Map<NK, NV>
}
