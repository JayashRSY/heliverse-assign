import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // Define variables
  allUsers: any;
  filteredUsers: any;
  domains: any;
  selectedDomain: any;
  genders: any;
  selectedGender: any;
  availabilities: any;
  selectedAvailability: any;
  searchName: string = '';
  currentPage: number = 1;
  itemsPerPage = 10;
  pageSize: number = 10;
  team: any = [];
  teamDetails: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Fetch users data from API
    this.http.get('assets/heliverse_mock_data.json').subscribe(data => {
      this.allUsers = data;
      this.filteredUsers = data;
      // Extract unique genders and domains
      this.genders = Array.from(new Set(this.allUsers.map((user: any) => user.gender)));
      this.domains = Array.from(new Set(this.allUsers.map((user: any) => user.domain)));
      this.availabilities = Array.from(new Set(this.allUsers.map((user: any) => user.available)));
    });
  }

  filterUsers() {
    this.filteredUsers = this.allUsers
    this.filteredUsers = this.filteredUsers.filter((user: any) =>
      (this.searchName ? (user.first_name + ' ' + user.first_name).toLowerCase().includes(this.searchName.toLowerCase()) : true)
      && (this.selectedDomain ? user.domain.toLowerCase() === this.selectedDomain.toLowerCase() : true)
      && (this.selectedGender ? user.gender.toLowerCase() === this.selectedGender.toLowerCase() : true)
      && (this.selectedAvailability ? user.availability.toLowerCase() === this.selectedAvailability.toLowerCase() : true))
  }
  // Define pagination function
  onPageChange(event: any) {
    this.currentPage = event;
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.filteredUsers = this.filteredUsers.slice(start, end);
  }
  onItemsPerPageChange(event: any) {
  console.log("🚀 ~ file: app.component.ts:56 ~ AppComponent ~ onItemsPerPageChange ~ event:", event);

  }
  // Define team creation function
  addToTeam(user: any) {
    if (user.availability === 'Available' && !this.team.find((teamUser: any) => teamUser.domain === user.domain)) {
      this.team.push(user);
      user.selected = true;
    }
  }

  removeFromTeam(user: any) {
    const index = this.team.indexOf(user);
    if (index > -1) {
      this.team.splice(index, 1);
      user.selected = false;
    }
  }

  createTeam() {
    if (this.team.length > 0) {
      this.teamDetails = true;
    }
  }

}
