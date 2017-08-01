<template>
    <div class="si">
        <div class="tablen-4">
            <table >
                <thead>
                    <tr>
                        <th v-for="key in head">{{key}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items">
                        <td>{{item.type}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.sales}}</td>
                        <td>{{item.store}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>

export default {
  name: 'ComponentTablen4',
  props:{
    head:Array,
    items:Array 
  }
}
</script>

<style lang="sass">
.si{
    .tablen-4{
        margin:0 15*0.01rem;
        table{
            width:100%;
            border-collapse: collapse;
            table-layout: fixed;
            thead{
                th{
                    font-size: 12*0.01rem;
                }
            }
            tr.hover{
                td{
                    background-color:#eee;
                }
            }
            td,th{
                color:#111;
                font-size:15*0.01rem;
                border-bottom: 1px solid #dddddd;
                padding:18*0.01rem 0 10*0.01rem;
                text-align: center;
                &:first-of-type{
                    text-align:left;
                    color:#555555;
                    width:80*0.01rem;
                }
                &:last-of-type{
                    text-align:right;
                }
                &:last-of-type{
                    text-align:right;
                }
            }
        }
    }
}

</style>
