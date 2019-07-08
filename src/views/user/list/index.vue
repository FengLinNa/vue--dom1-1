<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="id" label="id"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="className" label="班级"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="deleteRow(scope.row)" type="text" size="small">删除</el-button>
          <el-button type="text" size="small" @click="updateInfo(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="更新用户信息" :visible.sync="infoDialog">
       <el-form label-position="center" label-width="80px" :model="form">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="班级名称">
          <el-input v-model="form.className"></el-input>
        </el-form-item>

        <el-button type="primary" size="medium" @click="saveInfo">保存</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data(){
    return {
      infoDialog: false,
      form: {
        id: '',
        name: '',
        className: ''
      }
    }
  },
  computed: {
    ...mapState({
      tableData: state => state.user.list
    })
  },
  methods: {
    ...mapActions({
      getUserList: "user/getUserList",
      deleteUser: "user/deleteUser",
      updateUser: "user/updateUser"
    }),
    deleteRow(row) {
      // console.log('row...', row);
      this.deleteUser({ id: row.id });
    },
    updateInfo(row){
      this.infoDialog = true;
      this.form = {...row};
    },
    saveInfo(){
      this.updateUser(this.form);
      this.infoDialog = false;
    }
  },
  created() {
    this.getUserList();
  }
};
</script>